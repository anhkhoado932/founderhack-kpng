"use client"

import * as React from "react"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { UserProfile } from "@/components/auth/user-profile"
import { Navigation } from "@/components/navigation"
import { Chat } from "@/components/chat"
import { Community } from "@/components/community"

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState<"chat" | "community">("chat")
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Welcome message for authenticated users */}
        {user && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Welcome back, {user.name || user.email}!
                  </h1>
                  <p className="text-sm text-gray-600">
                    Ready to get personalized parenting advice?
                  </p>
                </div>
                <UserProfile />
              </div>
            </div>
          </div>
        )}
        
        <main className="h-[calc(100vh-120px)]">
          {activeTab === "chat" ? <Chat /> : <Community />}
        </main>
      </div>
    </ProtectedRoute>
  )
} 