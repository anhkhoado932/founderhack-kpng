"use client"

import * as React from "react"
import { Users, MessageCircle, Heart, Share2, Calendar, MapPin, Plus, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { CommunityService } from "@/lib/community-service"
import type { Database } from "@/lib/supabase"

type Post = Database['public']['Tables']['posts']['Row']
type Event = Database['public']['Tables']['events']['Row']

export function Community() {
  const [activeTab, setActiveTab] = React.useState<"discussions" | "events">("discussions")
  const [posts, setPosts] = React.useState<Post[]>([])
  const [events, setEvents] = React.useState<Event[]>([])
  const [categories, setCategories] = React.useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [showCreatePost, setShowCreatePost] = React.useState(false)
  const [newPost, setNewPost] = React.useState({
    title: "",
    content: "",
    category: "general",
    tags: [] as string[]
  })

  // Mock user for demo purposes (in real app, this would come from auth)
  const currentUser = {
    id: "demo_user_1",
    name: "Demo User",
    avatar: "DU"
  }

  React.useEffect(() => {
    loadData()
  }, [selectedCategory])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [postsData, eventsData, categoriesData] = await Promise.all([
        CommunityService.getPosts(selectedCategory === "all" ? undefined : selectedCategory),
        CommunityService.getEvents(),
        CommunityService.getCategories()
      ])
      
      setPosts(postsData)
      setEvents(eventsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadData()
      return
    }

    try {
      setIsLoading(true)
      const searchResults = await CommunityService.searchPosts(searchQuery)
      setPosts(searchResults)
    } catch (error) {
      console.error("Error searching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    try {
      const post = await CommunityService.createPost({
        title: newPost.title,
        content: newPost.content,
        author_id: currentUser.id,
        author_name: currentUser.name,
        author_avatar: currentUser.avatar,
        category: newPost.category,
        tags: newPost.tags
      })

      setPosts(prev => [post, ...prev])
      setNewPost({ title: "", content: "", category: "general", tags: [] })
      setShowCreatePost(false)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  const handleToggleLike = async (postId: string) => {
    try {
      await CommunityService.toggleLike(currentUser.id, postId)
      // Refresh posts to get updated like counts
      loadData()
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleJoinEvent = async (eventId: string) => {
    try {
      await CommunityService.joinEvent(eventId, currentUser.id, currentUser.name)
      // Refresh events to get updated attendee counts
      loadData()
    } catch (error) {
      console.error("Error joining event:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading community...</p>
        </div>
      </div>
    )
  }

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

      {/* Search and Filters */}
      <div className="p-6 border-b bg-muted/30">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
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
                    {post.author_avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-foreground">{post.author_name}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground capitalize">{post.category.replace('-', ' ')}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
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
                      <button 
                        onClick={() => handleToggleLike(post.id)}
                        className="flex items-center space-x-1 hover:text-foreground transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes_count}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments_count}</span>
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
                    {/* In a real app, you'd get the actual attendee count */}
                    <span>0</span>/{event.max_attendees} attending
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleJoinEvent(event.id)}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Join Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Post Button */}
      <div className="p-6 border-t bg-background">
        <button 
          onClick={() => setShowCreatePost(true)}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Start a Discussion</span>
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Create New Discussion</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What would you like to discuss?"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="general">General</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-4 py-2 border border-input text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 