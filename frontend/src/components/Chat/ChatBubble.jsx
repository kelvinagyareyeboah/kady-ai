import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bot, Cpu, AlertCircle, Info, Copy, Check } from 'lucide-react'

const ChatBubble = ({ message, isUser }) => {
  const [copied, setCopied] = useState(false)

  const getModelName = (modelId) => {
    if (!modelId) return 'Kady AI'
    
    const modelMap = {
      'deepseek/deepseek-chat': 'Kady AI',
      'deepseek/deepseek-coder': 'Kady AI Coder',
      'anthropic/claude-3-haiku': 'Kady AI Pro',
      'meta-llama/llama-3-70b-instruct': 'Kady AI Ultra',
      'openai/gpt-3.5-turbo': 'Kady AI'
    }
    
    return modelMap[modelId] || 'Kady AI'
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <motion.div
      className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="chat-bubble-avatar">
        {isUser ? (
          <User size={20} className="text-white" />
        ) : message.isError ? (
          <AlertCircle size={20} className="text-error" />
        ) : message.isInfo ? (
          <Info size={20} className="text-accent-primary" />
        ) : (
          <Bot size={20} className="text-accent-primary" />
        )}
      </div>
      <div 
        className="chat-bubble-content"
        data-iserror={message.isError}
        data-isinfo={message.isInfo}
      >
        {!isUser && message.model && !message.isError && !message.isInfo && (
          <div className="model-badge">
            <Cpu size={12} />
            <span>{getModelName(message.model)}</span>
          </div>
        )}
        
        <div className="chat-bubble-text">
          {message.text.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        <div className="chat-bubble-footer">
          <span className="chat-bubble-time">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          {!isUser && !message.isError && !message.isInfo && (
            <button
              onClick={handleCopy}
              className="copy-button"
              title="Copy response"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ChatBubble