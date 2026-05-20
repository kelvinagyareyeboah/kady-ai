import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import LandingPageNew from './pages/LandingPageNew';
import ChatPage from './pages/ChatPage';
import Sidebar from './components/Layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import './styles/global.css';
import './styles/layout.css';
import './styles/theme.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/chat.css';

function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMobileToggle = () => {
    setIsMobileOpen(prev => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  return (
    <ChatProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Landing Page - Header should be inside LandingPage */}
            <Route
              path="/"
              element={<LandingPageNew />}
            />

            {/* Chat Page */}
            <Route
              path="/chat"
              element={<ChatPage />}
            />
          </Routes>

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-xl)'
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-success)',
                  secondary: 'var(--color-bg-tertiary)'
                }
              },
              error: {
                iconTheme: {
                  primary: 'var(--color-error)',
                  secondary: 'var(--color-bg-tertiary)'
                }
              }
            }}
          />
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;