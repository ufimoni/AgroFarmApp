import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

import styles from './../farmStyles/chatarea.module.scss';
import {
  createNewMessage,
  getAllMessage
} from './../../../../api/message';
import { getOrCreateChatWithUser } from './../../../../api/chat';

const ChatArea = () => {
  const location = useLocation();
  const selectedUser = location.state?.selectedUser;
  const user = useSelector((state) => state.user.profile);

  const [chat, setChat] = useState(location.state?.chat || null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      let activeChat = chat;

      if (!activeChat && selectedUser) {
        const chatRes = await getOrCreateChatWithUser(selectedUser._id);
        if (chatRes.success) {
          activeChat = chatRes.data;
          setChat(activeChat);
        } else {
          toast.error('Could not load chat');
          return;
        }
      }

      if (!activeChat?._id) return;

      try {
        const res = await getAllMessage(activeChat._id);
        if (res.success) {
          const updated = res.data.map((msg) => ({
            ...msg,
            self: msg.sender === user._id,
          }));
          setMessages(updated);
        }
      } catch (err) {
        toast.error('Failed to load messages');
      }
    };

    if (user) fetchChatAndMessages();
  }, [chat, selectedUser, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !user?._id || !chat?._id) return;

    const tempId = Date.now();
    const tempMessage = {
      _id: tempId,
      sender: user._id,
      text: input,
      self: true,
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInput('');

    try {
      const payload = {
        chatId: chat._id,
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
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  if (!user || !chat || !selectedUser) {
    return <div className={styles.appChatArea}>Loading chat...</div>;
  }

  return (
    <div className={styles.appChatArea}>
      {/* Header */}
      <div className={styles.appChatAreaHeader}>
        Chat with {selectedUser.firstname} {selectedUser.lastname}
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg) => {
          const isCurrentUser = msg.sender === user._id;
          return (
            <div
              key={msg._id}
              className={`${styles.messageContainer} ${isCurrentUser ? styles.me : styles.other}`}
            >
              <div className={styles.messageBubble}>
                <div>{msg.text}</div>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className={styles.chatImage}
                  />
                )}
                <div className={styles.timestamp}>{formatTime(msg.createdAt)}</div>
              </div>
            </div>
          );
        })}
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
