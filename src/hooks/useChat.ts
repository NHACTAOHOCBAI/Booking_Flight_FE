import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import chatApi from '@/apis/apis/chat.api'
import type { ChatRequest } from '@/globalType/chat.type'

export const useChat = () => {
  const queryClient = useQueryClient()

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (request: ChatRequest) => chatApi.sendMessage(request),
    onSuccess: () => {
      // Invalidate chat history to refetch
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    }
  })

  // Create chat session mutation
  const createChatSessionMutation = useMutation({
    mutationFn: (ownerId: string) => chatApi.createChatSession(ownerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatSessions'] })
    }
  })

  // Delete chat session mutation
  const deleteChatSessionMutation = useMutation({
    mutationFn: (sessionId: string) => chatApi.deleteChatSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatSessions'] })
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    }
  })

  return {
    sendMessage: sendMessageMutation.mutate,
    sendMessageAsync: sendMessageMutation.mutateAsync,
    isSendingMessage: sendMessageMutation.isPending,
    sendMessageError: sendMessageMutation.error,
    
    createChatSession: createChatSessionMutation.mutate,
    createChatSessionAsync: createChatSessionMutation.mutateAsync,
    isCreatingSession: createChatSessionMutation.isPending,
    
    deleteChatSession: deleteChatSessionMutation.mutate,
    isDeletingSession: deleteChatSessionMutation.isPending
  }
}

// Hook to get chat history
export const useChatHistory = (sessionId: string | null) => {
  return useQuery({
    queryKey: ['chatHistory', sessionId],
    queryFn: () => sessionId ? chatApi.getChatHistory(sessionId) : Promise.resolve(null),
    enabled: !!sessionId
  })
}

// Hook to get all chat sessions
export const useChatSessions = (ownerId: string | null) => {
  return useQuery({
    queryKey: ['chatSessions', ownerId],
    queryFn: () => ownerId ? chatApi.getAllChatSessions(ownerId) : Promise.resolve(null),
    enabled: !!ownerId
  })
}
