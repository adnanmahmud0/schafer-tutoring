"use client";

import { useState, useEffect, useRef } from "react";
import { Paperclip, Calendar, ArrowUp, ArrowLeft, Loader2, Headphones } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ScheduleModal from "./schedule-modal";
import SessionProposal from "./session-proposal";
import { Textarea } from "../ui/textarea";
import { useMessages, useSendMessage, useMarkChatAsRead, useChats, Chat } from "@/hooks/api/use-chats";
import { useAuthStore } from "@/store/auth-store";
import { useSocket } from "@/providers/socket-provider";
import { useProposeSession, useAcceptSessionProposal, useRejectSessionProposal, useCounterProposeSession, useCancelSession } from "@/hooks/api/use-sessions";
import { useVideoCall } from "@/providers/video-call-provider";
import { toast } from "sonner";

interface ChatAreaProps {
  conversationId: string;
  onMenuClick: () => void;
}

export default function ChatArea({
  conversationId,
  onMenuClick,
}: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [counterProposalMessageId, setCounterProposalMessageId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const { joinChat, leaveChat, isConnected } = useSocket();

  // Check if it's a support chat (special case)
  const isSupportChat = conversationId === "support";

  // Join/leave socket room when conversation changes
  useEffect(() => {
    if (conversationId && !isSupportChat && isConnected) {
      joinChat(conversationId);
      return () => {
        leaveChat(conversationId);
      };
    }
  }, [conversationId, isSupportChat, isConnected, joinChat, leaveChat]);

  // Get chats to find the current chat info
  const { data: chats } = useChats();
  const currentChat = chats?.find(c => c._id === conversationId);

  // Get messages from API (skip for support chat)
  const { data: messages, isLoading: messagesLoading } = useMessages(isSupportChat ? '' : conversationId);
  const { mutate: sendMessage, isPending: isSending } = useSendMessage();
  const { mutate: markAsRead } = useMarkChatAsRead();
  const { mutate: proposeSession, isPending: isProposing } = useProposeSession();
  const { mutate: acceptProposal, isPending: isAccepting } = useAcceptSessionProposal();
  const { mutate: rejectProposal, isPending: isRejecting } = useRejectSessionProposal();
  const { mutate: counterPropose, isPending: isCounterProposing } = useCounterProposeSession();
  const { mutate: cancelSession, isPending: isCancelling } = useCancelSession();
  const { initiateCall } = useVideoCall();

  // Check if user is a tutor (can send session proposals)
  const isTutor = user?.role === 'TUTOR';

  // Get the other participant (not the current user)
  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find(p => p._id !== user?._id) || chat.participants[0];
  };

  const otherParticipant = currentChat ? getOtherParticipant(currentChat) : null;

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
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Mark chat as read when viewing
  useEffect(() => {
    if (conversationId && !isSupportChat && currentChat?.unreadCount && currentChat.unreadCount > 0) {
      markAsRead(conversationId);
    }
  }, [conversationId, isSupportChat, currentChat?.unreadCount, markAsRead]);

  const handleSend = () => {
    if (message.trim() && conversationId && !isSupportChat) {
      sendMessage({
        chatId: conversationId,
        content: message.trim(),
        type: 'TEXT',
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSchedule = (selectedDate: Date, time: string) => {
    if (!conversationId) return;

    // Parse time (format: HH:MM AM/PM)
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;

    // Create start time using the selected date
    const startTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hour24,
      minutes
    );

    // Default session duration: 1 hour
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    // Check if this is a counter-proposal (student suggesting alternative time)
    if (counterProposalMessageId) {
      counterPropose(
        {
          messageId: counterProposalMessageId,
          newStartTime: startTime.toISOString(),
          newEndTime: endTime.toISOString(),
        },
        {
          onSuccess: () => {
            toast.success('Counter-proposal sent! Waiting for tutor response.');
            setIsScheduleOpen(false);
            setCounterProposalMessageId(null);
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to send counter-proposal');
          },
        }
      );
    } else {
      // Tutor proposing new session
      const subject = currentChat?.subject || 'Tutoring Session';

      proposeSession(
        {
          chatId: conversationId,
          subject,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
        {
          onSuccess: () => {
            toast.success('Session proposal sent!');
            setIsScheduleOpen(false);
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to send proposal');
          },
        }
      );
    }
  };

  const handleSessionAction = (messageId: string, action: string, sessionId?: string) => {
    if (action === 'accepted') {
      acceptProposal(messageId, {
        onSuccess: () => {
          toast.success('Session accepted! Check your upcoming sessions.');
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to accept session');
        },
      });
    } else if (action === 'declined') {
      rejectProposal(messageId, {
        onSuccess: () => {
          toast.info('Session proposal declined');
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to decline session');
        },
      });
    } else if (action === 'cancelled' && sessionId) {
      cancelSession(
        { sessionId, cancellationReason: 'Cancelled by user' },
        {
          onSuccess: () => {
            toast.success('Session cancelled successfully');
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to cancel session');
          },
        }
      );
    }
  };

  // Support chat placeholder
  if (isSupportChat) {
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
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Support Chat</h2>
              <p className="text-xs text-muted-foreground">Get help from our team</p>
            </div>
          </div>
        </div>

        {/* Support Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <div className="rounded-lg px-4 py-2 bg-card border border-border rounded-bl-none">
                  <p className="text-sm">Welcome! How can we help you today?</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">Support Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full flex bg-background p-4">
          <div className="w-full">
            <div className="bg-card border border-border rounded-lg p-4">
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-20 mb-3 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 text-foreground bg-transparent">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="shrink-0 bg-[#0B31BD] text-white"
                  onClick={handleSend}
                  disabled={!message.trim()}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No conversation selected
  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Select a conversation to start chatting</p>
      </div>
    );
  }

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
            {(otherParticipant?.image || otherParticipant?.avatar) ? (
              <AvatarImage src={otherParticipant.image || otherParticipant.avatar} alt={otherParticipant.name} />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(otherParticipant?.name || 'U')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">
              {otherParticipant?.name || 'Chat'}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((msg) => {
            const isOwn = msg.sender._id === user?._id;
            const messageContent = (msg as any).text || msg.content;

            return (
              <div
                key={msg._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
                  {!isOwn && (
                    <Avatar className="w-8 h-8 shrink-0">
                      {(msg.sender.profilePicture || msg.sender.avatar) ? (
                        <AvatarImage src={msg.sender.profilePicture || msg.sender.avatar} alt={msg.sender.name} />
                      ) : null}
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(msg.sender.name || 'U')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={isOwn ? "text-right" : ""}>
                    {msg.sessionProposal ? (
                      <SessionProposal
                        date={new Date((msg.sessionProposal as any).startTime || msg.sessionProposal.scheduledAt).toLocaleDateString()}
                        time={new Date((msg.sessionProposal as any).startTime || msg.sessionProposal.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        endTime={(msg.sessionProposal as any).endTime ? new Date((msg.sessionProposal as any).endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined}
                        startTimeRaw={(msg.sessionProposal as any).startTime || msg.sessionProposal.scheduledAt}
                        endTimeRaw={(msg.sessionProposal as any).endTime}
                        status={(msg.sessionProposal as any).status}
                        isOwn={isOwn}
                        isLoading={isAccepting || isRejecting || isCounterProposing || isCancelling}
                        userRole={user?.role}
                        onAccept={() => handleSessionAction(msg._id, "accepted")}
                        onReschedule={() => {
                          // Counter-proposing alternative time
                          setCounterProposalMessageId(msg._id);
                          setIsScheduleOpen(true);
                        }}
                        onDecline={() => handleSessionAction(msg._id, "declined")}
                        onCancel={() => handleSessionAction(msg._id, "cancelled", (msg.sessionProposal as any).sessionId)}
                        onJoinSession={() => {
                          // Initiate Agora video call with the other participant
                          if (otherParticipant) {
                            initiateCall(
                              otherParticipant._id,
                              'video',
                              conversationId,
                              (msg.sessionProposal as any).sessionId
                            );
                          }
                        }}
                      />
                    ) : (
                      <>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            isOwn
                              ? "bg-accent text-accent-foreground rounded-br-none"
                              : "bg-card border border-border rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm wrap-break-word">{messageContent}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {formatTime(msg.createdAt)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="w-full flex bg-background p-4">
        <div className="w-full">
          <div className="bg-card border border-border rounded-lg p-4">
            <Textarea
              placeholder="Type your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isSending}
              className="min-h-20 mb-3 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            />

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-foreground bg-transparent"
              >
                <Paperclip className="w-4 h-4" />
              </Button>

              {isTutor && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-foreground bg-transparent"
                  onClick={() => setIsScheduleOpen(true)}
                  disabled={isProposing}
                >
                  {isProposing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Calendar className="w-4 h-4 text-blue-500" />
                  )}
                </Button>
              )}

              <div className="flex-1" />

              <Button
                size="icon"
                variant="ghost"
                className="shrink-0 bg-[#0B31BD] text-white disabled:opacity-50"
                onClick={handleSend}
                disabled={!message.trim() || isSending}
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => {
          setIsScheduleOpen(false);
          setCounterProposalMessageId(null);
        }}
        onSchedule={handleSchedule}
      />
    </div>
  );
}
