"use client"

import * as React from "react"
import { Users, MessageCircle, Heart, Share2, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  content: string
  likes: number
  comments: number
  timestamp: string
  tags: string[]
}

interface CommunityEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  maxAttendees: number
}

export function Community() {
  const [activeTab, setActiveTab] = React.useState<"discussions" | "events">("discussions")

  const posts: CommunityPost[] = [
    {
      id: "1",
      author: "Sarah M.",
      avatar: "SM",
      content: "Just wanted to share that my 18-month-old finally slept through the night! The gentle sleep training method really worked for us. Anyone else have success with this approach?",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      tags: ["sleep-training", "18-months", "success-story"]
    },
    {
      id: "2",
      author: "Mike R.",
      avatar: "MR",
      content: "Looking for recommendations on healthy snack ideas for a picky 2-year-old. We're trying to introduce more vegetables but it's been challenging. Any creative ideas?",
      likes: 15,
      comments: 12,
      timestamp: "5 hours ago",
      tags: ["nutrition", "picky-eater", "2-years-old", "vegetables"]
    },
    {
      id: "3",
      author: "Emma L.",
      avatar: "EL",
      content: "First time mom here! My baby is 6 months old and we're starting to think about introducing solid foods. Any tips on how to begin this journey?",
      likes: 31,
      comments: 18,
      timestamp: "1 day ago",
      tags: ["first-time-mom", "6-months", "solid-foods", "tips"]
    }
  ]

  const events: CommunityEvent[] = [
    {
      id: "1",
      title: "New Parents Meetup",
      description: "Join other new parents for coffee and conversation. Share experiences and make new friends!",
      date: "Dec 15, 2024 • 10:00 AM",
      location: "Central Park Coffee Shop",
      attendees: 12,
      maxAttendees: 20
    },
    {
      id: "2",
      title: "Toddler Playgroup",
      description: "Weekly playgroup for toddlers 18-36 months. Activities include music, crafts, and free play.",
      date: "Every Tuesday • 9:30 AM",
      location: "Community Center",
      attendees: 8,
      maxAttendees: 15
    },
    {
      id: "3",
      title: "Parenting Workshop: Managing Tantrums",
      description: "Learn effective strategies for managing toddler tantrums with child development expert Dr. Johnson.",
      date: "Dec 20, 2024 • 7:00 PM",
      location: "Library Meeting Room",
      attendees: 25,
      maxAttendees: 30
    }
  ]

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b bg-background">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Parent Community</h1>
            <p className="text-muted-foreground">Connect, share, and learn with other parents</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b bg-background">
        <div className="flex">
          <button
            onClick={() => setActiveTab("discussions")}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors",
              activeTab === "discussions"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Discussions
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors",
              activeTab === "events"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Events
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "discussions" ? (
          <div className="p-6 space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-card border rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                    </div>
                    
                    <p className="text-foreground mb-3">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-card border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {event.attendees}/{event.maxAttendees} attending
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Post Button */}
      <div className="p-6 border-t bg-background">
        <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Start a Discussion
        </button>
      </div>
    </div>
  )
} 