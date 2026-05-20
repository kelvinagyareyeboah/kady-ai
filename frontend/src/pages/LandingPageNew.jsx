import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import {
  MessageCircle,
  Zap,
  Shield,
  Globe,
  Star,
  ArrowRight,
  Brain,
  Clock,
  InfinityIcon,
  Sparkles,
  TrendingUp,
  Users,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import '../styles/landing-new.css';

const LandingPageNew = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized AI engine powered by cutting-edge technology",
      color: "#fbbf24"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are encrypted end-to-end and never stored on our servers",
      color: "#34d399"
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Communicate seamlessly in over 50 languages with real-time translation",
      color: "#60a5fa"
    },
    {
      icon: Brain,
      title: "Smart Context",
      description: "Advanced memory system remembers conversation context for meaningful interactions",
      color: "#a78bfa"
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Always ready to help, no matter the time zone or location",
      color: "#f472b6"
    },
    {
      icon: InfinityIcon,
      title: "Limitless Knowledge",
      description: "Access to vast information across countless topics and domains",
      color: "#fb923c"
    }
  ];

  const testimonials = [
    {
      name: "Amara Okafor",
      role: "Product Manager",
      content: "Kady AI has transformed how I brainstorm and iterate on product ideas. It's like having a senior PM always available.",
      avatar: "AO",
      rating: 5
    },
    {
      name: "Kwame Mensah",
      role: "Software Engineer",
      content: "The code suggestions and explanations are incredibly accurate. It's become an indispensable part of my workflow.",
      avatar: "KM",
      rating: 5
    },
    {
      name: "Zainab Adeyemi",
      role: "Content Creator",
      content: "From brainstorming to editing, Kady helps me create better content faster. The writing assistance is phenomenal.",
      avatar: "ZA",
      rating: 5
    }
  ];

  const stats = [
    { number: "10M+", label: "Conversations", icon: MessageCircle },
    { number: "99.9%", label: "Uptime", icon: TrendingUp },
    { number: "50+", label: "Languages", icon: Globe },
    { number: "100K+", label: "Happy Users", icon: Users }
  ];

  return (
    <div className="landing-page-new">
      {/* Floating Background Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Premium Header */}
      <header className="premium-header">
        <div className="container">
          <div className="header-content-new">
            <motion.div
              className="logo-new"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="logo-icon-new">
                <MessageCircle size={28} strokeWidth={2.5} />
              </div>
              <h1>Kady AI</h1>
            </motion.div>

            <nav className="desktop-nav">
              <a href="#features" className="nav-link">Features</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
              <a href="#pricing" className="nav-link">Pricing</a>
            </nav>

            <div className="header-actions">
              <Button
                variant="ghost"
                onClick={() => navigate('/chat')}
                className="sign-in-btn"
              >
                Sign In
              </Button>
              <Button
                icon={MessageCircle}
                onClick={() => navigate('/chat')}
                className="get-started-btn"
              >
                Get Started
              </Button>
            </div>

            <button className="landing-mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <Button onClick={() => navigate('/chat')} className="mobile-cta">
            Get Started
          </Button>
        </motion.div>
      )}

      <main className="landing-main-new">
        {/* Hero Section */}
        <section className="hero-section-new">
          <div className="hero-gradient-mesh"></div>

          <div className="container">
            <div className="hero-content-new">
              <motion.div
                className="hero-text-new"
                style={{ opacity, scale }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-badge">
                  <Sparkles size={16} />
                  <span>Powered by Advanced AI</span>
                </div>

                <h1 className="hero-title-new">
                  Experience the Future of
                  <span className="gradient-text"> AI Conversations</span>
                </h1>

                <p className="hero-description-new">
                  Kady AI is your intelligent companion for everything from creative brainstorming
                  to technical problem-solving. Unlock limitless possibilities with cutting-edge AI technology.
                </p>

                <div className="hero-actions-new">
                  <Button
                    size="large"
                    onClick={() => navigate('/chat')}
                    icon={MessageCircle}
                    className="hero-cta-primary"
                  >
                    Start Chatting Free
                  </Button>

                  <Button
                    variant="outline"
                    size="large"
                    onClick={() => {
                      const featuresSection = document.getElementById('features');
                      if (featuresSection) {
                        featuresSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hero-cta-secondary"
                  >
                    Explore Features
                    <ArrowRight size={20} />
                  </Button>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="stat-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <stat.icon size={20} className="stat-icon" />
                      <div className="stat-content">
                        <span className="stat-number-new">{stat.number}</span>
                        <span className="stat-label-new">{stat.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="hero-visual-new"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="chat-demo-new">
                  <div className="chat-window-header">
                    <div className="window-controls">
                      <span className="control-dot red"></span>
                      <span className="control-dot yellow"></span>
                      <span className="control-dot green"></span>
                    </div>
                    <div className="chat-title">
                      <MessageCircle size={16} />
                      <span>Kady AI</span>
                    </div>
                    <div className="window-actions"></div>
                  </div>

                  <div className="chat-messages-new">
                    <motion.div
                      className="message-new ai-message"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="message-avatar">
                        <Sparkles size={16} />
                      </div>
                      <div className="message-content">
                        <p>Hello! I'm Kady, your AI assistant. How can I help you today?</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="message-new user-message"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className="message-content">
                        <p>Help me brainstorm innovative product ideas for 2024</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="message-new ai-message typing-message"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="message-avatar">
                        <Sparkles size={16} />
                      </div>
                      <div className="message-content">
                        <div className="typing-indicator-new">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="chat-input-demo">
                    <input type="text" placeholder="Type your message..." disabled />
                    <button className="send-btn">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  className="floating-card card-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap size={20} />
                  <span>Fast Response</span>
                </motion.div>
                <motion.div
                  className="floating-card card-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield size={20} />
                  <span>Secure</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section-new">
          <div className="container">
            <motion.div
              className="section-header-new"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2>Powerful Features for Modern Workflows</h2>
              <p>Everything you need to supercharge your productivity and creativity</p>
            </motion.div>

            <div className="features-grid-new">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="feature-card-new"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="feature-icon-wrapper" style={{ '--feature-color': feature.color }}>
                    <feature.icon size={28} strokeWidth={2} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-shine"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials-section-new">
          <div className="container">
            <motion.div
              className="section-header-new"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2>Loved by Professionals Worldwide</h2>
              <p>See what others are saying about their experience with Kady AI</p>
            </motion.div>

            <div className="testimonials-grid-new">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="testimonial-card-new"
                  whileHover={{ y: -5 }}
                >
                  <div className="testimonial-header">
                    <div className="testimonial-rating-new">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <div className="testimonial-text-new">
                    <p>"{testimonial.content}"</p>
                  </div>

                  <div className="testimonial-author-new">
                    <div className="author-avatar-new">
                      {testimonial.avatar}
                    </div>
                    <div className="author-info-new">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section-new">
          <div className="cta-gradient-bg"></div>

          <div className="container">
            <motion.div
              className="cta-content-new"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="cta-icon-wrapper">
                <Sparkles size={48} />
              </div>

              <h2>Ready to Transform Your Productivity?</h2>
              <p>Join thousands of professionals already using Kady AI to enhance their workflow</p>

              <div className="cta-actions">
                <Button
                  size="large"
                  onClick={() => navigate('/chat')}
                  className="cta-button-primary"
                  icon={MessageCircle}
                >
                  Get Started Free
                </Button>
                <div className="cta-features">
                  <div className="cta-feature">
                    <CheckCircle size={16} />
                    <span>No credit card required</span>
                  </div>
                  <div className="cta-feature">
                    <CheckCircle size={16} />
                    <span>Free forever plan</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPageNew;
