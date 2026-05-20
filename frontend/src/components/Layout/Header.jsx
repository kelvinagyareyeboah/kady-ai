import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../UI/Button'
import { MessageCircle } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <div className="header-content">
        <div className="header-left">
          <motion.div 
            className="logo"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo-icon">
              <MessageCircle size={24} className="text-accent-primary" />
            </div>
            <h1>Kady AI</h1>
          </motion.div>
        </div>
        
        <nav className="header-nav">
          <Button
            icon={MessageCircle}
            onClick={() => navigate('/chat')}
            size="medium"
          >
            Start Chatting
          </Button>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header