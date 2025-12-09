"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface SessionProposalProps {
  date: string;
  time: string;
  onAccept: () => void;
  onReschedule: () => void;
  onDecline: () => void;
}

export default function SessionProposal({
  date,
  time,
  onAccept,
  onReschedule,
  onDecline,
}: SessionProposalProps) {
  const getDateDisplay = (dateStr: string) => {
    const today = new Date().toLocaleDateString("en-DE");
    return dateStr === today ? "Today" : dateStr;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 max-w-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Session proposal</h3>
        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
          Awaiting your response
        </span>
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

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={onAccept}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg"
        >
          Accept
        </Button>
        <Button
          variant="outline"
          onClick={onReschedule}
          className="w-full bg-background hover:bg-background/80"
        >
          Reschedule
        </Button>
        <Button
          variant="ghost"
          onClick={onDecline}
          className="w-full text-foreground hover:bg-background"
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
