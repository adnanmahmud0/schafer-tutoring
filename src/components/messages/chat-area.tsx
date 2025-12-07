"use client";

import React from "react";

import { Send, Paperclip, Calendar, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  senderName: string;
  avatar: string;
  message: string;
  time: string;
  isOwn: boolean;
}

interface ChatAreaProps {
  conversationId: string;
  onMenuClick: () => void;
}

const conversationData: Record<
  string,
  { name: string; avatar: string; messages: Message[] }
> = {
  sarah: {
    name: "Sarah Miller",
    avatar: "SM",
    messages: [
      {
        id: "1",
        sender: "sarah",
        senderName: "Sarah Miller",
        avatar: "SM",
        message: "I can help with the repair task",
        time: "10:30 AM",
        isOwn: false,
      },
    ],
  },
  emma1: {
    name: "Emma Wilson",
    avatar: "EW",
    messages: [
      {
        id: "1",
        sender: "emma",
        senderName: "Emma Wilson",
        avatar: "EW",
        message: "When can we schedule a call?",
        time: "Yesterday",
        isOwn: false,
      },
    ],
  },
  emma2: {
    name: "Emma Wilson",
    avatar: "EW",
    messages: [
      {
        id: "1",
        sender: "emma",
        senderName: "Emma Wilson",
        avatar: "EW",
        message: "When can we schedule a call?",
        time: "Yesterday",
        isOwn: false,
      },
    ],
  },
  support: {
    name: "Support Chat",
    avatar: "SC",
    messages: [
      {
        id: "1",
        sender: "support",
        senderName: "Support Team",
        avatar: "SC",
        message: "Welcome! How can we help you today?",
        time: "10:00 AM",
        isOwn: false,
      },
    ],
  },
  david: {
    name: "David Chen",
    avatar: "DC",
    messages: [
      {
        id: "1",
        sender: "david",
        senderName: "David Chen",
        avatar: "DC",
        message:
          "Hi! I've reviewed the project requirements and prepared some initial design concepts.",
        time: "10:15 AM",
        isOwn: false,
      },
      {
        id: "2",
        sender: "user",
        senderName: "You",
        avatar: "U",
        message: "Great! Could you share the mockups?",
        time: "10:20 AM",
        isOwn: true,
      },
    ],
  },
};

export default function ChatArea({
  conversationId,
  onMenuClick,
}: ChatAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    conversationData[conversationId]?.messages || []
  );

  const currentConversation = conversationData[conversationId] || {
    name: "Chat",
    avatar: "C",
    messages: [],
  };

  const handleSelectConversation = (id: string) => {
    setMessages(conversationData[id]?.messages || []);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        sender: "user",
        senderName: "You",
        avatar: "U",
        message: inputValue,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  // Watch conversation changes
  React.useEffect(() => {
    handleSelectConversation(conversationId);
  }, [conversationId]);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden h-8 w-8"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentConversation.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">
              {currentConversation.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isOwn ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-xs md:max-w-md ${
                message.isOwn ? "flex-row-reverse" : ""
              }`}
            >
              {!message.isOwn && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={message.isOwn ? "text-right" : ""}>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.isOwn
                      ? "bg-accent text-accent-foreground rounded-br-none"
                      : "bg-card border border-border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm break-words">{message.message}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {message.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4 md:p-6">
        <div className="flex items-center gap-2 bg-input rounded-lg p-2 border border-border">
          <Input
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="hidden sm:flex flex-shrink-0 gap-1 text-accent hover:bg-accent/10 h-8"
          >
            <Calendar className="w-3 h-3" />
            <span className="text-xs">Schedule</span>
          </Button>
          <Button
            size="icon"
            className="flex-shrink-0 h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleSendMessage}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
