"use client";

import ChatArea from "@/components/messages/chat-area";
import ConversationSidebar from "@/components/messages/conversation-sidebar";
import { useState } from "react";

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState("sarah");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-150px)] bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile, visible on larger screens */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`fixed left-0 top-0 h-full w-56 transform transition-transform duration-300 z-40 md:static md:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <ConversationSidebar
          selectedConversation={selectedConversation}
          onSelectConversation={(id) => {
            setSelectedConversation(id);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Chat Area */}
      <ChatArea
        conversationId={selectedConversation}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
}
