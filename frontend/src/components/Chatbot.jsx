import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/chatbot.css';
import api from '../utils/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const handleSend = async (messageText = null) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || sending) return;

    const userMessage = { 
      text: textToSend, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const { data } = await api.post('/api/chat', { message: textToSend });
      const botMessage = { 
        text: data.reply || "I couldn't process that.", 
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev, 
        { 
          text: 'Unable to connect to Car Care Connect assistant. Please try again shortly.', 
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const suggestions = [
    { label: "🚗 Ride rates & pricing", query: "What are the ride booking prices and rates?" },
    { label: "🧼 Doorstep car wash packages", query: "What car wash packages and pricing do you offer?" },
    { label: "🔧 Mechanic call-out fee", query: "How much does a mechanic callout cost?" }
  ];

  return (
    <>
      {/* Floating Circular Launcher Button */}
      <button 
        id="chat-bubble" 
        onClick={toggleChat} 
        aria-label={isOpen ? "Close chat" : "Open Car Care Connect Chat"} 
        title="Car Care Connect AI Assistant"
        style={{
          width: '56px',
          height: '56px',
          minWidth: '56px',
          maxWidth: '56px',
          minHeight: '56px',
          maxHeight: '56px',
          borderRadius: '50%',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        <span 
          className="bubble-status-dot"
          style={{
            width: '12px',
            height: '12px',
            minWidth: '12px',
            minHeight: '12px',
            borderRadius: '50%',
            boxSizing: 'border-box'
          }}
        ></span>
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Simple, Clean Chat Window */}
      {isOpen && (
        <div id="chat-container" role="dialog" aria-modal="true" aria-label="Car Care Connect AI Chatbot">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div 
                className="chat-avatar-badge"
                style={{
                  width: '34px',
                  height: '34px',
                  minWidth: '34px',
                  minHeight: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                🚗
              </div>
              <div>
                <h3 className="chat-header-title">Car Care Connect AI</h3>
                <p className="chat-header-subtitle">Online • Instant Support</p>
              </div>
            </div>
            <div className="chat-header-actions">
              {messages.length > 0 && (
                <button 
                  onClick={handleClearChat} 
                  title="Clear conversation"
                  aria-label="Clear chat"
                  style={{
                    width: '28px',
                    height: '28px',
                    minWidth: '28px',
                    minHeight: '28px',
                    borderRadius: '50%',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              )}
              <button 
                onClick={toggleChat} 
                title="Close chat"
                aria-label="Close chat"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  borderRadius: '50%',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div id="chatbox" ref={chatboxRef}>
            {messages.length === 0 ? (
              <div className="chat-welcome-container">
                <div 
                  className="chat-welcome-icon"
                  style={{
                    width: '42px',
                    height: '42px',
                    minWidth: '42px',
                    minHeight: '42px',
                    borderRadius: '50%',
                    margin: '0 auto 10px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  💬
                </div>
                <h4 className="chat-welcome-title">How can we help you?</h4>
                <p className="chat-welcome-desc">
                  Ask questions about rides, prices, car wash packages, or mechanic services.
                </p>
                <div className="chat-suggestions">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      className="chat-suggestion-chip"
                      onClick={() => handleSend(item.query)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span>{item.label}</span>
                      <span style={{ color: '#2563eb' }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`chat-row ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div 
                      className="chat-row-avatar"
                      style={{
                        width: '24px',
                        height: '24px',
                        minWidth: '24px',
                        minHeight: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box'
                      }}
                    >
                      🤖
                    </div>
                  )}
                  <div className={`chat-bubble-msg ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {sending && (
              <div className="chat-row bot">
                <div 
                  className="chat-row-avatar"
                  style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    minHeight: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  🤖
                </div>
                <div className="typing-dots">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div id="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                id="userInput"
                ref={inputRef}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Chat message input"
                maxLength={1000}
                disabled={sending}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  margin: 0
                }}
              />
            </div>
            {/* Perfect Circular Send Button */}
            <button 
              id="sendButton" 
              onClick={() => handleSend()} 
              disabled={sending || !input.trim()} 
              aria-label="Send message"
              title="Send"
              style={{
                width: '38px',
                height: '38px',
                minWidth: '38px',
                maxWidth: '38px',
                minHeight: '38px',
                maxHeight: '38px',
                borderRadius: '50%',
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>

          <div className="chat-footer-brand">
            Car Care Connect • AI Assistant
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
