package com.example.EzoicChat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.EzoicChat.Message;

@Controller
public class MessageController {
    @MessageMapping("/chat")
    @SendTo("/topic/chatapp")
    public Message message(Message message) throws Exception {
        return message;
    }
}
