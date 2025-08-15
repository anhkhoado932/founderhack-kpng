"use client"

import { useState, useEffect, useCallback } from "react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  createdAt: Date
  isArchived: boolean
  messages: Message[]
}

const STORAGE_KEY = "chat-sessions"

export function useChatSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string>("")

  // Load sessions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsedSessions = JSON.parse(stored).map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }))
        setSessions(parsedSessions)
        
        // Set active session to the most recent one
        if (parsedSessions.length > 0) {
          const activeSessions = parsedSessions.filter((s: ChatSession) => !s.isArchived)
          if (activeSessions.length > 0) {
            const mostRecent = activeSessions.sort((a: ChatSession, b: ChatSession) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0]
            setActiveSessionId(mostRecent.id)
          } else {
            // No active sessions, create a new one
            createNewSession()
          }
        } else {
          // No sessions at all, create initial session
          createNewSession()
        }
      } catch (error) {
        console.error("Error loading chat sessions:", error)
        // If there's an error loading, create a new session
        createNewSession()
      }
    } else {
      // Create initial session if none exist
      createNewSession()
    }
  }, [])

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      createdAt: new Date(),
      isArchived: false,
      messages: [
        {
          id: "1",
          content: "Hello! I'm here to help you with parenting questions. How can I assist you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]
    }
    
    setSessions(prev => [newSession, ...prev])
    setActiveSessionId(newSession.id)
  }, [])

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  }, [sessions])

  // Ensure there's always an active session available
  useEffect(() => {
    const activeSessions = sessions.filter(s => !s.isArchived)
    if (sessions.length > 0 && activeSessions.length === 0) {
      // All sessions are archived, create a new one
      createNewSession()
    } else if (sessions.length > 0 && !activeSessionId) {
      // No active session selected, select the most recent active one
      const mostRecent = activeSessions.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
      if (mostRecent) {
        setActiveSessionId(mostRecent.id)
      }
    }
  }, [sessions, activeSessionId, createNewSession])

  const selectSession = useCallback((sessionId: string) => {
    setActiveSessionId(sessionId)
  }, [])

  const archiveSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, isArchived: true }
        : session
    ))
    
    // If archiving the active session, switch to another active session
    if (activeSessionId === sessionId) {
      const nextActive = sessions.find(s => !s.isArchived && s.id !== sessionId)
      if (nextActive) {
        setActiveSessionId(nextActive.id)
      } else {
        createNewSession()
      }
    }
  }, [activeSessionId, sessions, createNewSession])

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId))
    
    // If deleting the active session, switch to another session
    if (activeSessionId === sessionId) {
      const nextActive = sessions.find(s => s.id !== sessionId)
      if (nextActive) {
        setActiveSessionId(nextActive.id)
      } else {
        createNewSession()
      }
    }
  }, [activeSessionId, sessions, createNewSession])

  const addMessage = useCallback((sessionId: string, message: Message) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const updatedMessages = [...session.messages, message]
        
        // Update title based on first user message
        let title = session.title
        if (session.messages.length === 1 && message.isUser) {
          title = message.content.length > 30 
            ? message.content.substring(0, 30) + "..."
            : message.content
        }
        
        return {
          ...session,
          title,
          messages: updatedMessages
        }
      }
      return session
    }))
  }, [])

  const getActiveSession = useCallback(() => {
    return sessions.find(session => session.id === activeSessionId)
  }, [sessions, activeSessionId])

  return {
    sessions,
    activeSessionId,
    activeSession: getActiveSession(),
    createNewSession,
    selectSession,
    archiveSession,
    deleteSession,
    addMessage
  }
} 