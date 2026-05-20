import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ChatHistory from '../Chat/ChatHistory'
import { Home, Plus, Menu, X, MessageSquare } from 'lucide-react'
import { useChat } from '../../context/ChatContext'

const Sidebar = ({ onSelectSession, selectedSessionId, onNewChat, isMobileOpen, onMobileToggle, onMobileClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearMessages } = useChat()

  const handleNewChatClick = () => {
    clearMessages()
    if (onNewChat) onNewChat()
    navigate('/chat')
    if (onMobileClose) onMobileClose()
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (onMobileClose) onMobileClose()
  }

  const handleSessionSelect = (sessionId) => {
    if (onSelectSession) onSelectSession(sessionId)
    if (onMobileClose) onMobileClose()
  }

  return (
    <>
      {/* Mobile Menu Button - Only shows on mobile */}
      <button className="mobile-menu-toggle" onClick={onMobileToggle}>
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="sidebar-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        initial={false}
        animate={{ x: isMobileOpen ? 0 : 0 }}
      >
        <div className="sidebar-header">
          <motion.div
            className="logo"
            onClick={() => handleNavigation('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="logo-icon">
              <MessageSquare size={24} />
            </div>
            <h2>Kady AI</h2>
          </motion.div>

          <button className="sidebar-close" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-actions">
          <motion.button
            className="new-chat-btn"
            onClick={handleNewChatClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={20} />
            <span>New Chat</span>
          </motion.button>
        </div>

        <div className="sidebar-content">
          <ChatHistory
            onSelectSession={handleSessionSelect}
            selectedSessionId={selectedSessionId}
          />
        </div>

        <div className="sidebar-footer">
          <button
            className="sidebar-footer-btn"
            onClick={() => handleNavigation('/')}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          <div className="sidebar-version">
            <p>© 2025 Kady AI</p>
            <span>v1.0.0</span>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar