"use client"

import * as React from "react"
import { MessageCircle, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeTab: "chat" | "community"
  onTabChange: (tab: "chat" | "community") => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="w-full border-b bg-background">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation - Horizontal Menu */}
        <nav className="hidden md:flex items-center space-x-8 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-foreground">KPNG</span>
          </div>
          
          <div className="flex items-center space-x-6 ml-auto">
            <button
              onClick={() => onTabChange("chat")}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                activeTab === "chat"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </button>
            
            <button
              onClick={() => onTabChange("community")}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                activeTab === "community"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Users className="w-5 h-5" />
              <span>Community</span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation - Tabs */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <span className="text-lg font-bold text-foreground">KPNG</span>
            </div>
          </div>
          
          <div className="grid w-full grid-cols-2">
            <button
              onClick={() => onTabChange("chat")}
              className={cn(
                "flex flex-col items-center space-y-2 px-4 py-3 border-b-2 transition-colors",
                activeTab === "chat"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              )}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Chat</span>
            </button>
            
            <button
              onClick={() => onTabChange("community")}
              className={cn(
                "flex flex-col items-center space-y-2 px-4 py-3 border-b-2 transition-colors",
                activeTab === "community"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              )}
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Community</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 