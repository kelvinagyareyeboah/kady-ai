import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../../context/ChatContext'
import { MessageSquare, Trash2, MoreVertical, Edit2, Check, X } from 'lucide-react'

const ChatHistory = ({ onSelectSession, selectedSessionId }) => {
  const { sessions, deleteSession, clearAllSessions } = useChat()
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [hoveredId, setHoveredId] = useState(null)

  const handleDelete = (e, sessionId) => {
    e.stopPropagation()
    if (window.confirm('Delete this chat?')) {
      deleteSession(sessionId)
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Delete all chats? This cannot be undone.')) {
      clearAllSessions()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = formatDate(session.updatedAt || session.createdAt)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(session)
    return groups
  }, {})

  if (sessions.length === 0) {
    return (
      <div className="chat-history-empty">
        <div className="empty-icon">
          <MessageSquare size={32} strokeWidth={1.5} />
        </div>
        <p>No chats yet</p>
        <span>Start a conversation to see it here</span>
      </div>
    )
  }

  return (
    <div className="chat-history">
      <div className="chat-history-header">
        <h3>Chats</h3>
        {sessions.length > 0 && (
          <button
            onClick={handleClearAll}
            className="clear-all-btn"
            title="Clear all chats"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="chat-history-list">
        <AnimatePresence mode="popLayout">
          {Object.entries(groupedSessions).map(([date, dateSessions]) => (
            <div key={date} className="chat-history-group">
              <div className="chat-history-date">{date}</div>
              {dateSessions.map((session) => (
                <motion.div
                  key={session.id}
                  className={`chat-history-item ${selectedSessionId === session.id ? 'active' : ''}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredId(session.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectSession(session.id)}
                >
                  <div className="chat-history-item-content">
                    <MessageSquare size={16} className="chat-icon" />
                    <span className="chat-title">{session.title || 'New Chat'}</span>
                  </div>

                  {(hoveredId === session.id || selectedSessionId === session.id) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="delete-btn"
                      onClick={(e) => handleDelete(e, session.id)}
                      title="Delete chat"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ChatHistory