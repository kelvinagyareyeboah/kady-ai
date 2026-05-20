import React, { useState, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import Sidebar from '../components/Layout/Sidebar'
import ChatWindow from '../components/Chat/ChatWindow'
import ChatInput from '../components/Chat/ChatInput'
import { sendMessageWithCustomResponse, getAvailableModels } from '../utils/api'
import toast from 'react-hot-toast'

const ChatPage = () => {
  const {
    messages,
    addMessage,
    setMessages,
    setLoading,
    setError,
    setStreamingMessage,
    clearStreamingMessage,
    loadSession,
    currentSessionId
  } = useChat()
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-chat')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const availableModels = getAvailableModels()

  useEffect(() => {
    const storedModel = localStorage.getItem('selected-model')
    if (storedModel) {
      setSelectedModel(storedModel)
    }
  }, [])

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleMobileClose = () => {
    setIsMobileOpen(false)
  }

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    }
    addMessage(userMessage)

    setLoading(true)

    try {
      await sendMessageWithCustomResponse(
        text,
        (streamingText, isComplete) => {
          if (isComplete) {
            const aiMessage = {
              id: Date.now().toString(),
              text: streamingText,
              sender: 'ai',
              timestamp: new Date().toISOString(),
              model: selectedModel
            }
            addMessage(aiMessage)
            clearStreamingMessage()
            setLoading(false)
          } else {
            setStreamingMessage(streamingText)
          }
        }
      )

    } catch (error) {
      setError(error)
      setLoading(false)
      clearStreamingMessage()

      const errorMessage = {
        id: Date.now().toString(),
        text: `Sorry, I encountered an error: ${error.message}`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      }
      addMessage(errorMessage)
    }
  }

  const handleSelectSession = (sessionId) => {
    loadSession(sessionId)
    handleMobileClose()
  }

  const handleNewChat = () => {
    // clearMessages is called in Sidebar
    handleMobileClose()
  }

  return (
    <div className="chat-page">
      <Sidebar
        onSelectSession={handleSelectSession}
        selectedSessionId={currentSessionId}
        onNewChat={handleNewChat}
        isMobileOpen={isMobileOpen}
        onMobileToggle={handleMobileToggle}
        onMobileClose={handleMobileClose}
      />

      <div className="chat-main">
        <ChatWindow />

        <div className="chat-input-section">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage