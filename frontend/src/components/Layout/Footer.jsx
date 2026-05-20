import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h4>Kady AI</h4>
          <p>Smarter Conversations, Anytime</p>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-links">
            <a href="https://github.com/KelvCodes" className="footer-link">GitHub</a>
            <a href="https://twitter.com/_yo_kelvin" className="footer-link">Twitter</a>
            <a href="https://www.linkedin.com/in/kelvingyareyeboah" className="footer-link">LinkedIn</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">API Reference</a>
            <a href="#" className="footer-link">Support</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Kady AI. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer