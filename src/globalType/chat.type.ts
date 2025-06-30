export interface ChatMessage {
  id: string
  sessionId: string
  prompt: string
  response: string
  createdAt: string
  role: 'user' | 'assistant'
}

export interface ChatSession {
  id: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface ChatRequest {
  prompt: string
  sessionId: string
}

export interface ChatResponse {
  prompt: string
  response: string
}

export interface CreateChatSessionRequest {
  ownerId: string
}
