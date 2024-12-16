// src/components/student/Messaging.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Messaging = () => {
  const [chats, setChats] = useState([]);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Kullanıcının tüm rezervasyonlarını ve ilgili sohbetleri al
    const fetchChats = async () => {
      try {
        const response = await api.get('/chats'); // Backend'de uygun endpoint
        setChats(response.data);
      } catch (err) {
        console.error('Sohbetler alınamadı:', err);
      }
    };

    fetchChats();
  }, []);

  const handleSendMessage = async () => {
    if (!currentBookingId || !message.trim()) return;
    try {
      await api.post('/chats', { bookingId: currentBookingId, message });
      setMessage('');
      // Yeni mesajları fetch edebilirsiniz veya anında ekleyebilirsiniz
    } catch (err) {
      console.error('Mesaj gönderilemedi:', err);
    }
  };

  return (
    <div className="messaging-container">
      <h2>Mesajlaşma</h2>
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.bookingId}
            onClick={() => setCurrentBookingId(chat.bookingId)}
            className={`chat-item ${currentBookingId === chat.bookingId ? 'active' : ''}`}
          >
            <p>Rezervasyon ID: {chat.bookingId}</p>
            {/* Diğer özet bilgileri ekleyebilirsiniz */}
          </div>
        ))}
      </div>
      {currentBookingId && (
        <div className="chat-window">
          <h3>Sohbet ID: {currentBookingId}</h3>
          {/* Sohbet mesajlarını listeleyin */}
          <div className="messages">
            {chats
              .find((chat) => chat.bookingId === currentBookingId)
              ?.messages.map((msg) => (
                <div key={msg.chatId} className={`message ${msg.senderId === /* current user id */ 1 ? 'sent' : 'received'}`}>
                  <p>{msg.message}</p>
                  <span>{new Date(msg.sentAt).toLocaleString()}</span>
                </div>
              ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
            />
            <button onClick={handleSendMessage}>Gönder</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;
