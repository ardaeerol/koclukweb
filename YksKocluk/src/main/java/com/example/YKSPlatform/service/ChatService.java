package com.example.YKSPlatform.service;

import com.example.YKSPlatform.entity.Chat;
import com.example.YKSPlatform.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<Chat> getChatsByBookingId(Long bookingId) {
        return chatRepository.findByBookingBookingId(bookingId);
    }

    public Chat createChat(Chat chat) {
        return chatRepository.save(chat);
    }
}
