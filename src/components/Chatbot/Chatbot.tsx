import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button, Input, Typography, Avatar, Spin, message, Drawer } from 'antd'
import { SendOutlined, CloseOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons'
import { useChat } from '@/hooks/useChat'
import { chatStorageService, type StoredChatMessage, type StoredChatSession } from '@/utils/chatStorage'
import MarkdownMessage from '@/components/MarkdownMessage'
import type { ChatMessage } from '@/globalType/chat.type'
import './Chatbot.css'

const { Text } = Typography
const { TextArea } = Input

interface ChatbotProps {
  visible: boolean
  onClose: () => void
  currentUserId?: string
}

const Chatbot: React.FC<ChatbotProps> = ({ visible, onClose, currentUserId = 'guest' }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { 
    sendMessageAsync, 
    isSendingMessage, 
    createChatSessionAsync, 
    isCreatingSession 
  } = useChat()

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize chat session when chatbot opens
  const initializeChat = useCallback(async () => {
    try {
      // Check if there's a current session in localStorage
      const storedSessionId = chatStorageService.getCurrentSessionId()
      if (storedSessionId) {
        setCurrentSessionId(storedSessionId)
        return
      }

      // Create new session
      const sessionResponse = await createChatSessionAsync(currentUserId)
      if (sessionResponse.data?.data?.id) {
        const newSessionId = sessionResponse.data.data.id
        setCurrentSessionId(newSessionId)
        
        // Save session to localStorage
        const newSession: StoredChatSession = {
          id: newSessionId,
          ownerId: currentUserId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString(),
          messageCount: 1
        }
        chatStorageService.saveChatSession(newSession)
        chatStorageService.setCurrentSessionId(newSessionId)

        // Add welcome message
        const welcomeMessage: StoredChatMessage = {
          id: 'welcome',
          sessionId: newSessionId,
          prompt: '',
          response: 'Hello! I\'m your **flight booking assistant**. How can I help you today?\n\nI can help you with:\n- Flight searches and bookings\n- Travel information\n- Airline policies\n- Booking modifications\n\nJust ask me anything! 😊',
          createdAt: new Date().toISOString(),
          role: 'assistant',
          timestamp: new Date().toISOString()
        }
        
        chatStorageService.saveChatMessage(welcomeMessage)
        setMessages([{
          id: 'welcome',
          sessionId: newSessionId,
          prompt: '',
          response: welcomeMessage.response,
          createdAt: new Date().toISOString(),
          role: 'assistant'
        }])
      }
    } catch (error) {
      message.error('Failed to initialize chat session')
      console.error('Chat initialization error:', error)
    }
  }, [createChatSessionAsync, currentUserId])

  // Load messages from local storage when session changes
  useEffect(() => {
    if (currentSessionId) {
      const storedMessages = chatStorageService.getChatMessages(currentSessionId)
      if (storedMessages.length > 0) {
        const chatMessages: ChatMessage[] = storedMessages.map(msg => ({
          id: msg.id,
          sessionId: msg.sessionId,
          prompt: msg.prompt,
          response: msg.response,
          createdAt: msg.createdAt,
          role: msg.role
        }))
        setMessages(chatMessages)
      }
    }
  }, [currentSessionId])

  useEffect(() => {
    if (visible && !currentSessionId) {
      initializeChat()
    }
  }, [visible, currentSessionId, initializeChat])

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !currentSessionId) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sessionId: currentSessionId,
      prompt: currentMessage,
      response: '',
      createdAt: new Date().toISOString(),
      role: 'user'
    }

    // Save user message to localStorage
    const storedUserMessage: StoredChatMessage = {
      ...userMessage,
      timestamp: new Date().toISOString()
    }
    chatStorageService.saveChatMessage(storedUserMessage)

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    const messageToSend = currentMessage
    setCurrentMessage('')

    try {
      const response = await sendMessageAsync({
        prompt: messageToSend,
        sessionId: currentSessionId
      })

      if (response.data?.data?.response) {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sessionId: currentSessionId,
          prompt: '',
          response: response.data.data.response,
          createdAt: new Date().toISOString(),
          role: 'assistant'
        }

        // Save assistant message to localStorage
        const storedAssistantMessage: StoredChatMessage = {
          ...assistantMessage,
          timestamp: new Date().toISOString()
        }
        chatStorageService.saveChatMessage(storedAssistantMessage)

        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      message.error('Failed to send message')
      console.error('Send message error:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetChat = async () => {
    // Clear current session from localStorage
    if (currentSessionId) {
      chatStorageService.deleteChatSession(currentSessionId)
    }
    chatStorageService.setCurrentSessionId(null)
    
    setMessages([])
    setCurrentSessionId(null)
    await initializeChat()
  }

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar icon={<RobotOutlined />} className="bg-blue-500" />
            <span>Flight Assistant</span>
          </div>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={resetChat}
            className="text-gray-500 hover:text-gray-700"
            title="Start new conversation"
          />
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      className="chatbot-drawer"
      styles={{
        body: { padding: 0, height: '100%' }
      }}
    >
      <div className="flex flex-col h-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 chatbot-messages">
          {isCreatingSession ? (
            <div className="flex justify-center items-center h-32">
              <Spin size="large" />
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 chat-message ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <Avatar icon={<RobotOutlined />} className="bg-blue-500 flex-shrink-0" size="small" />
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <Text className="!text-white">
                      {msg.prompt}
                    </Text>
                  ) : (
                    <MarkdownMessage 
                      content={msg.response} 
                      className="text-gray-800"
                    />
                  )}
                </div>
                {msg.role === 'user' && (
                  <Avatar icon={<UserOutlined />} className="bg-gray-500 flex-shrink-0" size="small" />
                )}
              </div>
            ))
          )}
          {isSendingMessage && (
            <div className="flex gap-3 justify-start chat-message">
              <Avatar icon={<RobotOutlined />} className="bg-blue-500 flex-shrink-0" size="small" />
              <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none px-3 py-2">
                <Spin size="small" />
                <Text className="ml-2 !text-gray-800">Typing...</Text>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <TextArea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about flights, booking, or any travel questions..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="flex-1"
              disabled={isSendingMessage || !currentSessionId}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              loading={isSendingMessage}
              disabled={!currentMessage.trim() || !currentSessionId}
              className="self-end"
            />
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default Chatbot
