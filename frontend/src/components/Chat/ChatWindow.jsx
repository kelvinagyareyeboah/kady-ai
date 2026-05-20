import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../../context/ChatContext'
import ChatBubble from './ChatBubble'
import Spinner from '../UI/Spinner'

const ChatWindow = () => {
  const { messages, isLoading, streamingMessage } = useChat()
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  return (
    <div ref={containerRef} className="chat-window">
      <div className="chat-messages">
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              className="chat-empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chat-empty-icon">
                <div className="w-16 h-16 bg-accent-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">K</span>
                  </div>
                </div>
              </div>
              <h3>Welcome to Kady AI</h3>
              <p>Start a conversation by typing a message below</p>
              <div className="chat-empty-suggestions">
                <div className="suggestion">"What can you help me with?"</div>
                <div className="suggestion">"Tell me about AI technology"</div>
                <div className="suggestion">"How do I get started with React?"</div>
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  delay: index * 0.02 
                }}
                className={`message-wrapper ${message.sender === 'user' ? 'user' : 'ai'}`}
              >
                <ChatBubble
                  message={message}
                  isUser={message.sender === 'user'}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {streamingMessage && (
          <motion.div
            className="chat-bubble chat-bubble-ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="chat-bubble-avatar">
              <div className="w-8 h-8 bg-accent-primary/20 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-accent-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">K</span>
                </div>
              </div>
            </div>
            <div className="chat-bubble-content">
              <div className="chat-bubble-text">
                {streamingMessage.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}

        {isLoading && !streamingMessage && (
          <motion.div
            className="chat-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Spinner />
            <span>Kady is thinking...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} className="chat-scroll-anchor" />
      </div>
    </div>
  )
}

export default ChatWindow