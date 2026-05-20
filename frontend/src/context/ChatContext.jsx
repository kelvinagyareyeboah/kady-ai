import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import toast from 'react-hot-toast'

const ChatContext = createContext()

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload }
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [], currentSessionId: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'SET_STREAMING_MESSAGE':
      return { ...state, streamingMessage: action.payload }
    case 'CLEAR_STREAMING_MESSAGE':
      return { ...state, streamingMessage: null }
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload }
    case 'ADD_SESSION':
      return { ...state, sessions: [action.payload, ...state.sessions] }
    case 'UPDATE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map(session =>
          session.id === action.payload.id ? action.payload : session
        )
      }
    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.payload)
      }
    case 'SET_CURRENT_SESSION':
      return { ...state, currentSessionId: action.payload }
    default:
      return state
  }
}

export const ChatProvider = ({ children }) => {
  const [savedSessions, saveSessions] = useLocalStorage('kady-ai-sessions', [])

  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    sessions: savedSessions,
    currentSessionId: null,
    isLoading: false,
    error: null,
    streamingMessage: null
  })

  // Sync sessions to localStorage whenever they change
  useEffect(() => {
    saveSessions(state.sessions)
  }, [state.sessions, saveSessions])

  const addMessage = useCallback((message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message })
    
    // Update or create session
    if (message.sender === 'user') {
      const sessionId = state.currentSessionId || `session-${Date.now()}`
      const existingSession = state.sessions.find(s => s.id === sessionId)
      
      if (existingSession) {
        // Update existing session
        const updatedSession = {
          ...existingSession,
          messages: [...existingSession.messages, message],
          updatedAt: new Date().toISOString(),
          title: existingSession.title || message.text.substring(0, 50)
        }
        dispatch({ type: 'UPDATE_SESSION', payload: updatedSession })
      } else {
        // Create new session
        const newSession = {
          id: sessionId,
          title: message.text.substring(0, 50),
          messages: [message],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        dispatch({ type: 'ADD_SESSION', payload: newSession })
        dispatch({ type: 'SET_CURRENT_SESSION', payload: sessionId })
      }
    } else if (message.sender === 'ai' && state.currentSessionId) {
      // Add AI response to current session
      const existingSession = state.sessions.find(s => s.id === state.currentSessionId)
      if (existingSession) {
        const updatedSession = {
          ...existingSession,
          messages: [...existingSession.messages, message],
          updatedAt: new Date().toISOString()
        }
        dispatch({ type: 'UPDATE_SESSION', payload: updatedSession })
      }
    }
  }, [state.currentSessionId, state.sessions])

  const setMessages = useCallback((messages) => {
    dispatch({ type: 'SET_MESSAGES', payload: messages })
  }, [])

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }, [])

  const deleteSession = useCallback((sessionId) => {
    dispatch({ type: 'DELETE_SESSION', payload: sessionId })
    
    // If we're deleting the current session, clear messages
    if (state.currentSessionId === sessionId) {
      dispatch({ type: 'CLEAR_MESSAGES' })
    }
    
    toast.success('Chat deleted')
  }, [state.currentSessionId])

  const loadSession = useCallback((sessionId) => {
    const session = state.sessions.find(s => s.id === sessionId)
    if (session) {
      dispatch({ type: 'SET_MESSAGES', payload: session.messages })
      dispatch({ type: 'SET_CURRENT_SESSION', payload: sessionId })
      toast.success('Chat loaded')
    }
  }, [state.sessions])

  const clearAllSessions = useCallback(() => {
    dispatch({ type: 'SET_SESSIONS', payload: [] })
    dispatch({ type: 'CLEAR_MESSAGES' })
    toast.success('All chats cleared')
  }, [])

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading })
  }, [])

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
    toast.error(error.message || 'Something went wrong')
  }, [])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const setStreamingMessage = useCallback((message) => {
    dispatch({ type: 'SET_STREAMING_MESSAGE', payload: message })
  }, [])

  const clearStreamingMessage = useCallback(() => {
    dispatch({ type: 'CLEAR_STREAMING_MESSAGE' })
  }, [])

  const value = {
    messages: state.messages,
    sessions: state.sessions,
    currentSessionId: state.currentSessionId,
    isLoading: state.isLoading,
    error: state.error,
    streamingMessage: state.streamingMessage,
    addMessage,
    setMessages,
    clearMessages,
    deleteSession,
    loadSession,
    clearAllSessions,
    setLoading,
    setError,
    clearError,
    setStreamingMessage,
    clearStreamingMessage
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}