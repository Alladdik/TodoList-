import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css, ThemeProvider } from 'styled-components';
import axios from 'axios';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const lightTheme = {
  background: '#f5f5f5',
  text: '#333',
  primary: '#4CAF50',
  secondary: '#45a049',
  chatBackground: '#fff',
};

const darkTheme = {
  background: '#333',
  text: '#f5f5f5',
  primary: '#4CAF50',
  secondary: '#45a049',
  chatBackground: '#444',
};

const AssistantContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const AssistantIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 30px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background-color: ${props => props.theme.background};
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: move;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.primary};
  color: #fff;
  padding: 15px;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatBody = styled.div`
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  background-color: ${props => props.theme.chatBackground};
  color: ${props => props.theme.text};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.secondary};
  }
`;

const ChatInputContainer = styled.form`
  display: flex;
  padding: 10px;
  background-color: ${props => props.theme.chatBackground};
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 20px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.secondary};
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.secondary};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  ${props => props.isLoading && css`
    animation: ${pulse} 1s infinite;
  `}
`;

const Message = styled(motion.div)`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
  ${({ isUser, theme }) => isUser ? `
    background-color: ${theme.primary};
    color: #fff;
    align-self: flex-end;
  ` : `
    background-color: ${theme.chatBackground};
    color: ${theme.text};
    align-self: flex-start;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  `}
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  margin: 0 2px;
  animation: ${pulse} 1s infinite;
  animation-delay: ${props => props.delay}s;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SettingsWindow = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  background-color: ${props => props.theme.background};
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  z-index: 1001;
  color: ${props => props.theme.text};
`;

const SettingsTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  color: ${props => props.theme.text};
`;

const SettingsInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  background-color: ${props => props.theme.chatBackground};
  color: ${props => props.theme.text};
`;

const SettingsLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${props => props.theme.text};
`;

const SettingsSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  background-color: ${props => props.theme.chatBackground};
  color: ${props => props.theme.text};
`;

const SettingsCheckbox = styled.input`
  margin-right: 5px;
`;

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [assistantStyle, setAssistantStyle] = useState('');
  const [wordLimit, setWordLimit] = useState(100);
  const [language, setLanguage] = useState('uk');
  const [theme, setTheme] = useState('light');
  const [autoTranslate, setAutoTranslate] = useState(false);
  const messagesEndRef = useRef(null);
  const dragControls = useDragControls();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAssistantStyleChange = (e) => setAssistantStyle(e.target.value);

  const handleWordLimitChange = (e) => {
    const limit = parseInt(e.target.value);
    if (limit >= 1 && limit <= 500) {
      setWordLimit(limit);
    }
  };

  const handleLanguageChange = (e) => setLanguage(e.target.value);
  
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    if (newTheme === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else {
      setTheme(newTheme);
    }
  };

  const handleAutoTranslateChange = (e) => setAutoTranslate(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/generate',
        { 
          prompt: input,
          assistantStyle: assistantStyle,
          wordLimit: wordLimit,
          language: language,
          autoTranslate: autoTranslate
        }
      );
      const assistantMessage = { text: response.data.generated_text, isUser: false };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Помилка при зверненні до вашого API:', error);
      const errorMessage = { text: 'Вибачте, виникла помилка. Спробуйте ще раз.', isUser: false };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <AssistantContainer
        drag
        dragControls={dragControls}
        dragMomentum={false}
      >
        <AssistantIcon
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🤖
        </AssistantIcon>
        <AnimatePresence>
          {isOpen && (
            <ChatWindow
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              onPointerDown={(e) => dragControls.start(e)}
            >
              <ChatHeader>
                <SettingsButton onClick={toggleSettings}>⚙️</SettingsButton>
                AI Асистент
                <CloseButton onClick={toggleChat}>×</CloseButton>
              </ChatHeader>
              <ChatBody>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    isUser={message.isUser}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.text}
                  </Message>
                ))}
                {isLoading && (
                  <TypingIndicator>
                    <TypingDot delay={0} />
                    <TypingDot delay={0.2} />
                    <TypingDot delay={0.4} />
                  </TypingIndicator>
                )}
                <div ref={messagesEndRef} />
              </ChatBody>
              <ChatInputContainer onSubmit={handleSubmit}>
                <ChatInput
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Введіть ваше повідомлення..."
                  disabled={isLoading}
                />
                <SendButton type="submit" disabled={isLoading} isLoading={isLoading}>
                  {isLoading ? '...' : '➤'}
                </SendButton>
              </ChatInputContainer>
              <AnimatePresence>
                {isSettingsOpen && (
                  <SettingsWindow
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SettingsTitle>Налаштування асистента</SettingsTitle>
                    <SettingsLabel htmlFor="assistantStyle">Стиль асистента:</SettingsLabel>
                    <SettingsInput
                      id="assistantStyle"
                      type="text"
                      value={assistantStyle}
                      onChange={handleAssistantStyleChange}
                      placeholder="Опишіть бажаний стиль асистента"
                    />
                    <SettingsLabel htmlFor="wordLimit">Ліміт слів (1-500):</SettingsLabel>
                    <SettingsInput
                      id="wordLimit"
                      type="number"
                      min="1"
                      max="500"
                      value={wordLimit}
                      onChange={handleWordLimitChange}
                    />
                    <SettingsLabel htmlFor="language">Мова інтерфейсу:</SettingsLabel>
                    <SettingsSelect
                      id="language"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option value="uk">Українська</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                    </SettingsSelect>
                    <SettingsLabel htmlFor="theme">Тема:</SettingsLabel>
                    <SettingsSelect
                      id="theme"
                      value={theme}
                      onChange={handleThemeChange}
                    >
                      <option value="light">Світла</option>
                      <option value="dark">Темна</option>
                      <option value="auto">Авто (системна)</option>
                    </SettingsSelect>
                    <SettingsLabel>
                      <SettingsCheckbox
                        type="checkbox"
                        checked={autoTranslate}
                        onChange={handleAutoTranslateChange}
                      />
                      Автоматичний переклад
                    </SettingsLabel>
                  </SettingsWindow>
                )}
              </AnimatePresence>
            </ChatWindow>
          )}
        </AnimatePresence>
      </AssistantContainer>
    </ThemeProvider>
  );
}

export default Assistant;