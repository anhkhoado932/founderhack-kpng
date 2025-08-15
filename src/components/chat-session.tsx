"use client"

import * as React from "react"
import { Plus, Archive, MessageCircle, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSession {
  id: string
  title: string
  createdAt: Date
  isArchived: boolean
  messages: any[]
}

interface ChatSessionProps {
  sessions: ChatSession[]
  activeSessionId: string
  onSessionSelect: (sessionId: string) => void
  onNewSession: () => void
  onArchiveSession: (sessionId: string) => void
  onDeleteSession: (sessionId: string) => void
}

export function ChatSession({ 
  sessions, 
  activeSessionId, 
  onSessionSelect, 
  onNewSession, 
  onArchiveSession, 
  onDeleteSession 
}: ChatSessionProps) {
  const activeSessions = sessions.filter(s => !s.isArchived)
  const archivedSessions = sessions.filter(s => s.isArchived)

  return (
    <div className="w-80 bg-muted/30 border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Active Sessions */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Active Chats</h3>
          <div className="space-y-2">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                  activeSessionId === session.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-muted"
                )}
              >
                <div
                  className="flex-1 min-w-0"
                  onClick={() => onSessionSelect(session.id)}
                >
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs opacity-70">
                        {session.messages.length} messages • {session.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onArchiveSession(session.id)
                    }}
                    className="p-1 rounded hover:bg-muted/50 transition-colors"
                    title="Archive chat"
                  >
                    <Archive className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteSession(session.id)
                    }}
                    className="p-1 rounded hover:bg-muted/50 transition-colors"
                    title="Delete chat"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            {activeSessions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No active chats
              </p>
            )}
          </div>
        </div>

        {/* Archived Sessions */}
        {archivedSessions.length > 0 && (
          <div className="p-4 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Archived Chats</h3>
            <div className="space-y-2">
              {archivedSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 opacity-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate opacity-70">{session.title}</p>
                      <p className="text-xs opacity-50">
                        {session.messages.length} messages • {session.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteSession(session.id)}
                    className="p-1 rounded hover:bg-muted/50 transition-colors"
                    title="Delete chat"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 