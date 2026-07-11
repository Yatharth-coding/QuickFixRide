import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/chatbot.css';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatboxRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://quickfixride-backend.onrender.com/api/chat', { message: userMessage.text });
      const botMessage = { text: response.data.reply || "I couldn't process that.", sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Error: Unable to connect to the chatbot service.', sender: 'bot' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div id="chat-bubble" onClick={toggleChat}>
        💬
      </div>
      {isOpen && (
        <div id="chat-container">
          <div id="chatbox" ref={chatboxRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender === 'user' ? 'chat-user' : 'chat-bot'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div id="input-container">
            <input
              type="text"
              id="userInput"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button id="sendButton" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
