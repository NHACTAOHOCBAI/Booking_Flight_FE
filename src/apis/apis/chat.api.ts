import http from '../http'
import type { ChatRequest, ChatResponse, ChatSession, ChatMessage } from '@/globalType/chat.type'

const chatApi = {
  // Send a message to the chatbot
  sendMessage: (request: ChatRequest) => {
    return http.post<APIResponse<ChatResponse>>('/api/chat/message', request)
  },

  // Create a new chat session
  createChatSession: (ownerId: string) => {
    return http.post<APIResponse<ChatSession>>(`/api/chat/session?ownerId=${ownerId}`)
  },

  // Get chat history for a session
  getChatHistory: (sessionId: string) => {
    return http.get<APIResponse<ChatMessage[]>>(`/api/chat/history/${sessionId}`)
  },

  // Get all chat sessions for a user
  getAllChatSessions: (ownerId: string) => {
    return http.get<APIResponse<ChatSession[]>>(`/api/chat/sessions/${ownerId}`)
  },

  // Delete a chat session
  deleteChatSession: (sessionId: string) => {
    return http.delete<APIResponse<string>>(`/api/chat/session/${sessionId}`)
  }
}

export default chatApi
