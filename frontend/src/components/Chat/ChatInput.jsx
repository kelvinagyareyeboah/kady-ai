import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../UI/Button'
import { Send, Paperclip, Mic, Key, Square } from 'lucide-react'

const ChatInput = ({ onSendMessage, isLoading, disabled = false }) => {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        setMessage(prev => prev + transcript)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      setRecognition(recognition)
    }
  }, [])

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start()
        setIsListening(true)
      } catch (error) {
        console.error('Failed to start recognition:', error)
      }
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }

  const isSpeechSupported = () => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  }

  return (
    <motion.div
      className="chat-input-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="chat-input-wrapper">
        <div className={`chat-input-field ${disabled ? 'disabled' : ''}`}>
          <button type="button" className="chat-input-action" disabled={disabled}>
            <Paperclip size={20} />
          </button>
          
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "Configure API key to start chatting..." : "Type your message... "}
            className="chat-input"
            disabled={isLoading || disabled}
            rows={1}
          />
          
          <div className="chat-input-actions-right">
            {isSpeechSupported() && !message.trim() && (
              <button 
                type="button" 
                className={`chat-input-action ${isListening ? 'listening' : ''}`}
                disabled={disabled || isLoading}
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <Square size={20} /> : <Mic size={20} />}
              </button>
            )}
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading || disabled}
              className={`chat-mini-send ${(!message.trim() || isLoading || disabled) ? 'disabled' : ''}`}
            >
              {isLoading ? (
                <div className="mini-spinner"></div>
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </form>
      
      <AnimatePresence>
        {isListening && (
          <motion.div
            className="voice-listening-indicator"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="pulse-animation"></div>
            Listening...
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {message.trim() && !disabled && (
          <motion.div
            className="chat-input-hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Press ⏎ Enter to send
          </motion.div>
        )}
      </AnimatePresence>

      {disabled && (
        <div className="api-warning-hint">
          <Key size={14} />
          <span>API key required - check the .env file</span>
        </div>
      )}
    </motion.div>
  )
}

export default ChatInput