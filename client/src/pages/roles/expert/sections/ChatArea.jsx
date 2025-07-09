import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './../expertStyles/chatarea.module.scss';
import { FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { createNewMessage, getAllMessage } from './../../../../api/message';
import toast from 'react-hot-toast';

const ChatArea = () => {
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;
  const selectedChat = location.state?.chat;
  const user = useSelector((state) => state.user.profile);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedChat?._id || !user?._id) return;

      try {
        const response = await getAllMessage(selectedChat._id);
        if (response.success) {
          const updated = response.data.map((msg) => ({
            ...msg,
            self: msg.sender === user._id,
          }));
          setMessages(updated);
        }
      } catch (error) {
        toast.error('Failed to fetch messages');
      }
    };

    getMessages();
  }, [selectedChat, user]);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!user?._id || !selectedChat?._id) return;

    const tempId = Date.now();
    const tempMessage = {
      _id: tempId,
      sender: user._id,
      text: input,
      self: true,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInput('');

    try {
      const payload = {
        chatId: selectedChat._id,
        sender: user._id,
        text: input,
      };

      const response = await createNewMessage(payload);
      if (response.success && response.data) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === tempId ? { ...response.data, self: true } : msg
          )
        );
        toast.success('Message sent');
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (!user || !selectedChat) {
    return <div className={styles.appChatArea}>Loading chat...</div>;
  }

  return (
    <div className={styles.appChatArea}>
      {/* Header */}
      <div className={styles.appChatAreaHeader}>
        {selectedUser
          ? `Chat with ${selectedUser.firstname} ${selectedUser.lastname}`
          : 'Chat'}
      </div>

      {/* Messages */}
      <div className={styles.messages} id="main-chat-area">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`${styles.message} ${msg.self ? styles.me : styles.other}`}
          >
            <div>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.sendMessageDiv}>
        <input
          type="text"
          className={styles.sendMessageInput}
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <FaPaperPlane
          className={styles.sendMessageBtn}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatArea;
