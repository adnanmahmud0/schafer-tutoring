"use client";

import { Search, CheckCircle2, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  isRead: boolean;
}

const conversations: Conversation[] = [
  {
    id: "sarah",
    name: "Sarah Miller",
    avatar: "SM",
    message: "I can help with the repair task",
    time: "10:30 AM",
    isRead: false,
  },
  {
    id: "emma1",
    name: "Emma Wilson",
    avatar: "EW",
    message: "When can we schedule a call?",
    time: "Yesterday",
    isRead: true,
  },
  {
    id: "emma2",
    name: "Emma Wilson",
    avatar: "EW",
    message: "When can we schedule a call?",
    time: "Yesterday",
    isRead: true,
  },
];

interface ConversationSidebarProps {
  selectedConversation: string;
  onSelectConversation: (id: string) => void;
}

export default function ConversationSidebar({
  selectedConversation,
  onSelectConversation,
}: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportClick = () => {
    onSelectConversation("support");
  };

  return (
    <div className="w-56 border-r border-border bg-card flex flex-col h-full mt-24 md:mt-0">
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full p-4 border-b border-border text-left transition-colors hover:bg-muted ${
              selectedConversation === conversation.id ? "bg-muted" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 shrink-0 mt-1">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {conversation.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm text-foreground truncate">
                    {conversation.name}
                  </h3>
                  {!conversation.isRead && (
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.message}
                </p>
                <span className="text-xs text-muted-foreground">
                  {conversation.time}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-border p-[15.2px]">
        <button
          onClick={handleSupportClick}
          className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
            selectedConversation === "support"
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full">
            <Headphones className="w-4 h-4 " />
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold text-sm">Support Chat</div>
            <div className="text-xs opacity-75">Get help from our team</div>
          </div>
        </button>
      </div>
    </div>
  );
}
