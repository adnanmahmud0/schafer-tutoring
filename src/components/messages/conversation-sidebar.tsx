"use client";

import { Headphones, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChats, Chat } from "@/hooks/api/use-chats";
import { useAuthStore } from "@/store/auth-store";

interface ConversationSidebarProps {
  selectedConversation: string;
  onSelectConversation: (id: string) => void;
}

export default function ConversationSidebar({
  selectedConversation,
  onSelectConversation,
}: ConversationSidebarProps) {
  const { data: chats, isLoading } = useChats();
  const { user } = useAuthStore();

  // Get the other participant (not the current user)
  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find(p => p._id !== user?._id) || chat.participants[0];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const handleSupportClick = () => {
    onSelectConversation("support");
  };

  return (
    <div className="w-full h-full bg-card flex flex-col">
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : chats && chats.length > 0 ? (
          chats.map((chat) => {
            const otherParticipant = getOtherParticipant(chat);
            const hasUnread = chat.unreadCount > 0;

            return (
              <button
                key={chat._id}
                onClick={() => onSelectConversation(chat._id)}
                className={`w-full p-4 border-b border-border text-left transition-colors hover:bg-muted ${
                  selectedConversation === chat._id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 shrink-0 mt-1">
                    {(otherParticipant?.image || otherParticipant?.avatar) ? (
                      <AvatarImage src={otherParticipant.image || otherParticipant.avatar} alt={otherParticipant.name} />
                    ) : null}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(otherParticipant?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-semibold text-sm text-foreground truncate ${hasUnread ? 'font-bold' : ''}`}>
                        {otherParticipant?.name || 'User'}
                      </h3>
                      {hasUnread && (
                        <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs text-muted-foreground truncate ${hasUnread ? 'font-medium' : ''}`}>
                      {chat.lastMessage?.text || chat.lastMessage?.content || 'No messages yet'}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastMessage?.createdAt ? formatTime(chat.lastMessage.createdAt) : formatTime(chat.createdAt)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No conversations yet
          </div>
        )}
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
