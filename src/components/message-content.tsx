"use client"

import * as React from "react"

interface MessageContentProps {
  content: string
  className?: string
}

export function MessageContent({ content, className }: MessageContentProps) {
  // Function to format the content with basic markdown-like styling
  const formatContent = (text: string) => {
    // Split by lines to handle line breaks
    const lines = text.split('\n')
    
    return lines.map((line, index) => {
      // Handle numbered lists (1. **Title**: content)
      const numberedListMatch = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*:\s*(.+)$/)
      if (numberedListMatch) {
        const [, number, title, content] = numberedListMatch
        return (
          <div key={index} className="mb-3">
            <div className="flex items-start space-x-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                {number}
              </span>
              <div className="flex-1">
                <span className="font-semibold text-primary">{title}:</span>
                <span className="ml-1">{content}</span>
              </div>
            </div>
          </div>
        )
      }
      
      // Handle bold text (**text**)
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <span key={partIndex} className="font-semibold">
                    {part.slice(2, -2)}
                  </span>
                )
              }
              return part
            })}
          </p>
        )
      }
      
      // Handle regular lines
      if (line.trim()) {
        return <p key={index} className="mb-2">{line}</p>
      }
      
      // Handle empty lines
      return <div key={index} className="h-2" />
    })
  }

  return (
    <div className={className}>
      {formatContent(content)}
    </div>
  )
} 