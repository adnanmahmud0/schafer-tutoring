"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, Loader2, Check, X, RefreshCw, Video } from "lucide-react";

interface SessionProposalProps {
  date: string;
  time: string;
  endTime?: string;
  startTimeRaw?: Date | string;
  endTimeRaw?: Date | string;
  meetLink?: string;
  status?: 'PROPOSED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'COUNTER_PROPOSED';
  isOwn?: boolean;
  isLoading?: boolean;
  userRole?: string;
  onAccept: () => void;
  onReschedule: () => void;
  onDecline: () => void;
  onCancel?: () => void;
  onJoinSession?: () => void;
}

export default function SessionProposal({
  date,
  time,
  endTime,
  startTimeRaw,
  endTimeRaw,
  meetLink,
  status = 'PROPOSED',
  isOwn = false,
  isLoading = false,
  userRole,
  onAccept,
  onReschedule,
  onDecline,
  onCancel,
  onJoinSession,
}: SessionProposalProps) {
  const getDateDisplay = (dateStr: string) => {
    const today = new Date().toLocaleDateString("en-DE");
    return dateStr === today ? "Today" : dateStr;
  };

  // Calculate time until session starts
  const getTimeUntilSession = () => {
    if (!startTimeRaw) return null;
    const startDate = new Date(startTimeRaw);
    const now = new Date();
    const diffMs = startDate.getTime() - now.getTime();

    if (diffMs <= 0) return null;

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffMins > 0) {
      return `in ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    }
    return null;
  };

  // Check if session is starting soon (within 15 minutes)
  const isStartingSoon = () => {
    if (!startTimeRaw) return false;
    const startDate = new Date(startTimeRaw);
    const now = new Date();
    const diffMs = startDate.getTime() - now.getTime();
    const diffMins = diffMs / (1000 * 60);
    return diffMins > 0 && diffMins <= 15;
  };

  // Check if session is currently in progress (between start and end time)
  const isInProgress = () => {
    if (!startTimeRaw || !endTimeRaw) return false;
    const startDate = new Date(startTimeRaw);
    const endDate = new Date(endTimeRaw);
    const now = new Date();
    return now >= startDate && now <= endDate;
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium">
            Scheduled
          </span>
        );
      case 'REJECTED':
        return (
          <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-1">
            <X className="w-3 h-3" /> Declined
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            Expired
          </span>
        );
      case 'COUNTER_PROPOSED':
        return (
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Rescheduled
          </span>
        );
      default:
        return (
          <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            {isOwn ? 'Sent' : 'Awaiting response'}
          </span>
        );
    }
  };

  const timeUntil = getTimeUntilSession();
  const startingSoon = isStartingSoon();
  const inProgress = isInProgress();

  // Accepted session - Upcoming session card design
  if (status === 'ACCEPTED') {
    // Session is currently in progress (between start and end time)
    if (inProgress) {
      return (
        <div className="bg-card border border-border rounded-xl p-5 max-w-xs shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Session in progress</h3>
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
              In progress
            </span>
          </div>

          {/* Date Section */}
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">DATE</p>
              <p className="text-sm font-medium text-foreground">
                {getDateDisplay(date)}
              </p>
            </div>
          </div>

          {/* Time Section */}
          <div className="flex items-start gap-3 mb-5">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">TIME</p>
              <p className="text-sm font-medium text-foreground">
                {time}{endTime ? ` – ${endTime}` : ''}
              </p>
            </div>
          </div>

          {/* Join Session Button */}
          <Button
            onClick={onJoinSession}
            className="w-full bg-[#0B31BD] hover:bg-[#0B31BD]/90 text-white rounded-lg h-10"
          >
            <Video className="w-4 h-4 mr-2" />
            Join session
          </Button>
        </div>
      );
    }

    // Starting soon (within 15 minutes) - different design
    if (startingSoon) {
      return (
        <div className="bg-card border border-border rounded-xl p-5 max-w-xs shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-foreground">Session in progress</h3>
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
              Starting soon
            </span>
          </div>

          {/* Date Section */}
          <div className="flex items-start gap-3 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">DATE</p>
              <p className="text-sm font-medium text-foreground">
                {getDateDisplay(date)}
              </p>
            </div>
          </div>

          {/* Time Section */}
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase">TIME</p>
              <p className="text-sm font-medium text-foreground">
                {time}{endTime ? ` – ${endTime}` : ''}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Normal scheduled session (more than 15 minutes away)
    return (
      <div className="bg-card border border-border rounded-xl p-5 max-w-xs shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground">Upcoming session</h3>
          {getStatusBadge()}
        </div>

        {/* Date Section */}
        <div className="flex items-start gap-3 mb-4">
          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase">DATE</p>
            <p className="text-sm font-medium text-foreground">
              {getDateDisplay(date)}
            </p>
          </div>
        </div>

        {/* Time Section */}
        <div className="flex items-start gap-3 mb-5">
          <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase">TIME</p>
            <p className="text-sm font-medium text-foreground">
              {time}{endTime ? ` – ${endTime}` : ''}{timeUntil ? ` (${timeUntil})` : ''}
            </p>
          </div>
        </div>

        {/* Action Buttons for Accepted Session */}
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={onReschedule}
            disabled={isLoading}
            className="w-full border-border hover:bg-muted/50 rounded-lg h-10"
          >
            Reschedule
          </Button>
          <Button
            variant="outline"
            onClick={onCancel || onDecline}
            disabled={isLoading}
            className="w-full border-border hover:bg-muted/50 rounded-lg h-10"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Default - Session proposal card
  return (
    <div className="bg-card border border-border rounded-lg p-4 max-w-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Session proposal</h3>
        {getStatusBadge()}
      </div>

      {/* Date Section */}
      <div className="flex items-start gap-3 mb-3">
        <Calendar className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground font-medium">DATE</p>
          <p className="text-sm font-medium text-foreground">
            {getDateDisplay(date)}
          </p>
        </div>
      </div>

      {/* Time Section */}
      <div className="flex items-start gap-3 mb-4">
        <Clock className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground font-medium">TIME</p>
          <p className="text-sm font-medium text-foreground">{time}</p>
        </div>
      </div>

      {/* Action Buttons - Only show for recipient when status is PROPOSED */}
      {!isOwn && status === 'PROPOSED' && (
        <div className="flex flex-col gap-2">
          <Button
            onClick={onAccept}
            disabled={isLoading}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Accept'}
          </Button>
          {/* Reschedule button - Student can counter-propose alternative time */}
          <Button
            variant="outline"
            onClick={onReschedule}
            disabled={isLoading}
            className="w-full bg-background hover:bg-background/80"
          >
            Reschedule
          </Button>
          <Button
            variant="ghost"
            onClick={onDecline}
            disabled={isLoading}
            className="w-full text-foreground hover:bg-background"
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
}
