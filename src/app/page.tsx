"use client"

import * as React from "react"
import { Navigation } from "@/components/navigation"
import { Chat } from "@/components/chat"
import { Community } from "@/components/community"

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState<"chat" | "community">("chat")

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="h-[calc(100vh-120px)]">
        {activeTab === "chat" ? <Chat /> : <Community />}
      </main>
    </div>
  )
} 