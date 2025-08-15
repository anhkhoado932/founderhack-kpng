"use client"

import * as React from "react"
import { Send, MessageCircle, Baby, Utensils, Heart, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageContent } from "./message-content"
import { ChatSession } from "./chat-session"
import { useChatSessions } from "@/hooks/use-chat-sessions"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function Chat() {
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showSidebar, setShowSidebar] = React.useState(false)
  
  const {
    sessions,
    activeSessionId,
    activeSession,
    createNewSession,
    selectSession,
    archiveSession,
    deleteSession,
    addMessage
  } = useChatSessions()

  const quickQuestions = [
    { icon: Baby, text: "Sleep training tips", color: "bg-blue-100 text-blue-700" },
    { icon: Utensils, text: "Feeding schedule", color: "bg-green-100 text-green-700" },
    { icon: Heart, text: "Bonding activities", color: "bg-pink-100 text-pink-700" }
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !activeSession) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    addMessage(activeSessionId, userMessage)
    const currentInput = inputValue
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: currentInput,
          conversationHistory: activeSession.messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      }
      
      addMessage(activeSessionId, aiMessage)
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      }
      
      addMessage(activeSessionId, errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        showSidebar ? "translate-x-0" : "-translate-x-full"
      )}>
        <ChatSession
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={selectSession}
          onNewSession={createNewSession}
          onArchiveSession={archiveSession}
          onDeleteSession={deleteSession}
        />
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-6 border-b bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Parenting Assistant</h1>
                <p className="text-muted-foreground">Get expert advice for early childhood care</p>
              </div>
            </div>
            <button
              onClick={createNewSession}
              className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="p-6 border-b bg-muted/30">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Questions</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.text)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors",
                  question.color,
                  "hover:opacity-80"
                )}
              >
                <question.icon className="w-4 h-4" />
                <span>{question.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeSession?.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-4 py-3 rounded-2xl",
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                )}
              >
                {message.isUser ? (
                  <p className="text-sm">{message.content}</p>
                ) : (
                  <MessageContent content={message.content} className="text-sm" />
                )}
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t bg-background">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about parenting, sleep, feeding, development..."
              className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 