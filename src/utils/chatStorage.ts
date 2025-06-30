import type { ChatMessage, ChatSession } from '@/globalType/chat.type'

const STORAGE_KEYS = {
  CHAT_SESSIONS: 'flyTime_chat_sessions',
  CHAT_MESSAGES: 'flyTime_chat_messages',
  CURRENT_SESSION: 'flyTime_current_session'
}

export interface StoredChatSession extends ChatSession {
  lastMessageAt: string
  messageCount: number
}

export interface StoredChatMessage extends ChatMessage {
  timestamp: string
}

class ChatStorageService {
  // Get all chat sessions from localStorage
  getChatSessions(ownerId: string): StoredChatSession[] {
    try {
      const sessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS)
      if (!sessions) return []
      
      const allSessions: StoredChatSession[] = JSON.parse(sessions)
      return allSessions.filter(session => session.ownerId === ownerId)
    } catch (error) {
      console.error('Error loading chat sessions:', error)
      return []
    }
  }

  // Save a chat session to localStorage
  saveChatSession(session: StoredChatSession): void {
    try {
      const existingSessions = this.getAllChatSessions()
      const sessionIndex = existingSessions.findIndex(s => s.id === session.id)
      
      if (sessionIndex >= 0) {
        existingSessions[sessionIndex] = session
      } else {
        existingSessions.push(session)
      }
      
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(existingSessions))
    } catch (error) {
      console.error('Error saving chat session:', error)
    }
  }

  // Get all sessions (for internal use)
  private getAllChatSessions(): StoredChatSession[] {
    try {
      const sessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS)
      return sessions ? JSON.parse(sessions) : []
    } catch (error) {
      console.error('Error loading all chat sessions:', error)
      return []
    }
  }

  // Get chat messages for a specific session
  getChatMessages(sessionId: string): StoredChatMessage[] {
    try {
      const messages = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES)
      if (!messages) return []
      
      const allMessages: StoredChatMessage[] = JSON.parse(messages)
      return allMessages.filter(message => message.sessionId === sessionId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    } catch (error) {
      console.error('Error loading chat messages:', error)
      return []
    }
  }

  // Save a chat message to localStorage
  saveChatMessage(message: StoredChatMessage): void {
    try {
      const existingMessages = this.getAllChatMessages()
      const messageIndex = existingMessages.findIndex(m => m.id === message.id)
      
      if (messageIndex >= 0) {
        existingMessages[messageIndex] = message
      } else {
        existingMessages.push(message)
      }
      
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(existingMessages))
      
      // Update session's last message time and count
      this.updateSessionMetadata(message.sessionId)
    } catch (error) {
      console.error('Error saving chat message:', error)
    }
  }

  // Get all messages (for internal use)
  private getAllChatMessages(): StoredChatMessage[] {
    try {
      const messages = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES)
      return messages ? JSON.parse(messages) : []
    } catch (error) {
      console.error('Error loading all chat messages:', error)
      return []
    }
  }

  // Update session metadata (last message time, count)
  private updateSessionMetadata(sessionId: string): void {
    const sessions = this.getAllChatSessions()
    const sessionIndex = sessions.findIndex(s => s.id === sessionId)
    
    if (sessionIndex >= 0) {
      const messages = this.getChatMessages(sessionId)
      sessions[sessionIndex].lastMessageAt = new Date().toISOString()
      sessions[sessionIndex].messageCount = messages.length
      
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions))
    }
  }

  // Delete a chat session and its messages
  deleteChatSession(sessionId: string): void {
    try {
      // Remove session
      const sessions = this.getAllChatSessions()
      const filteredSessions = sessions.filter(s => s.id !== sessionId)
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(filteredSessions))
      
      // Remove messages
      const messages = this.getAllChatMessages()
      const filteredMessages = messages.filter(m => m.sessionId !== sessionId)
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(filteredMessages))
    } catch (error) {
      console.error('Error deleting chat session:', error)
    }
  }

  // Get current session ID
  getCurrentSessionId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION)
    } catch (error) {
      console.error('Error loading current session:', error)
      return null
    }
  }

  // Set current session ID
  setCurrentSessionId(sessionId: string | null): void {
    try {
      if (sessionId) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, sessionId)
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION)
      }
    } catch (error) {
      console.error('Error saving current session:', error)
    }
  }

  // Clear all chat data
  clearAllChatData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_SESSIONS)
      localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES)
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION)
    } catch (error) {
      console.error('Error clearing chat data:', error)
    }
  }
}

export const chatStorageService = new ChatStorageService()
