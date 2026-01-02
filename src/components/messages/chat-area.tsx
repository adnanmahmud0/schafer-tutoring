"use client";

import { useState } from "react";

import React from "react";

import { Send, Paperclip, Calendar, Menu, ArrowUp, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScheduleModal from "./schedule-modal";
import SessionProposal from "./session-proposal";
import { Textarea } from "../ui/textarea";

interface Message {
  id: string;
  sender: string;
  senderName: string;
  avatar: string;
  message: string;
  time: string;
  isOwn: boolean;
  sessionProposal?: {
    date: string;
    time: string;
  };
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
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const currentConversation = conversationData[conversationId] || {
    name: "Chat",
    avatar: "C",
    messages: [],
  };

  const handleSelectConversation = (id: string) => {
    setMessages(conversationData[id]?.messages || []);
  };

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleSchedule = (date: string, time: string) => {
    const scheduleMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: "user",
      senderName: "You",
      avatar: "U",
      message: "Session proposal",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      sessionProposal: {
        date,
        time,
      },
    };
    setMessages([...messages, scheduleMessage]);
  };

  const handleSessionAction = (messageId: string, action: string) => {
    console.log(`[v0] Session ${action} for message ${messageId}`);
    // This can be extended to handle Accept/Reschedule/Decline logic
  };

  React.useEffect(() => {
    handleSelectConversation(conversationId);
  }, [conversationId]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden h-8 w-8"
          >
            <ArrowLeft className="w-5 h-5" />
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
              className={`flex gap-3 ${
                message.isOwn ? "flex-row-reverse" : ""
              }`}
            >
              {!message.isOwn && (
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={message.isOwn ? "text-right" : ""}>
                {message.sessionProposal ? (
                  <SessionProposal
                    date={message.sessionProposal.date}
                    time={message.sessionProposal.time}
                    onAccept={() => handleSessionAction(message.id, "accepted")}
                    onReschedule={() => {
                      setIsScheduleOpen(true);
                      handleSessionAction(message.id, "reschedule");
                    }}
                    onDecline={() =>
                      handleSessionAction(message.id, "declined")
                    }
                  />
                ) : (
                  <>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.isOwn
                          ? "bg-accent text-accent-foreground rounded-br-none"
                          : "bg-card border border-border rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm wrap-break-word">
                        {message.message}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {message.time}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="w-full flex bg-background p-4">
        <div className="w-full ">
          <div className="bg-card border border-border rounded-lg p-4">
            <Textarea
              placeholder="Type Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-20 mb-3 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"

                className="h-10 w-10 text-foreground bg-transparent"
              >
                <Paperclip className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"

                className="h-10 w-10 text-foreground bg-transparent"
              >
                <Calendar className="text-[#0B31BD]" />
              </Button>

              <div className="flex-1" />

              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 bg-[#0B31BD] text-white hover:bg-[#0B31BD] hover:text-white"
                onClick={handleSend}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={handleSchedule}
      />
    </div>
  );
}
