package com.example.YKSPlatform.controller;

import com.example.YKSPlatform.entity.Chat;
import com.example.YKSPlatform.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/booking/{bookingId}")
    public List<Chat> getChatsByBookingId(@PathVariable Long bookingId) {
        return chatService.getChatsByBookingId(bookingId);
    }

    @PostMapping
    public Chat createChat(@RequestBody Chat chat) {
        return chatService.createChat(chat);
    }
}
