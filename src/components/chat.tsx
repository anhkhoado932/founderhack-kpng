"use client"

import * as React from "react"
import { Send, MessageCircle, Baby, Utensils, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to help you with parenting questions. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const quickQuestions = [
    { icon: Baby, text: "Sleep training tips", color: "bg-blue-100 text-blue-700" },
    { icon: Utensils, text: "Feeding schedule", color: "bg-green-100 text-green-700" },
    { icon: Heart, text: "Bonding activities", color: "bg-pink-100 text-pink-700" }
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your question! I'm here to provide personalized parenting advice. This is a demo response - in a real app, this would connect to an AI service for specific guidance.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b bg-background">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Parenting Assistant</h1>
            <p className="text-muted-foreground">Get expert advice for early childhood care</p>
          </div>
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
        {messages.map((message) => (
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
              <p className="text-sm">{message.content}</p>
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
  )
} 