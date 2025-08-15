import { supabase } from './supabase'
import type { Database } from './supabase'

type Post = Database['public']['Tables']['posts']['Row']
type Comment = Database['public']['Tables']['comments']['Row']
type Event = Database['public']['Tables']['events']['Row']
type EventAttendee = Database['public']['Tables']['event_attendees']['Row']

export class CommunityService {
  // Posts
  static async getPosts(category?: string, limit = 10, offset = 0) {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  static async getPost(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>) {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updatePost(id: string, updates: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Comments
  static async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  }

  static async createComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'likes_count'>) {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateComment(id: string, updates: Partial<Comment>) {
    const { data, error } = await supabase
      .from('comments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteComment(id: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Likes
  static async toggleLike(userId: string, postId?: string, commentId?: string) {
    // Check if like already exists
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('post_id', postId || null)
      .eq('comment_id', commentId || null)
      .single()

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id)

      if (error) throw error
      return { liked: false }
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert({
          user_id: userId,
          post_id: postId || null,
          comment_id: commentId || null
        })

      if (error) throw error
      return { liked: true }
    }
  }

  static async checkIfLiked(userId: string, postId?: string, commentId?: string) {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('post_id', postId || null)
      .eq('comment_id', commentId || null)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return !!data
  }

  // Events
  static async getEvents(limit = 10, offset = 0) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_attendees!inner(count)
      `)
      .order('date', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data
  }

  static async getEvent(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_attendees(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateEvent(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Event Attendance
  static async joinEvent(eventId: string, userId: string, userName: string, status: 'going' | 'maybe' | 'not_going' = 'going') {
    const { data, error } = await supabase
      .from('event_attendees')
      .upsert({
        event_id: eventId,
        user_id: userId,
        user_name: userName,
        status
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async leaveEvent(eventId: string, userId: string) {
    const { error } = await supabase
      .from('event_attendees')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId)

    if (error) throw error
  }

  static async getEventAttendees(eventId: string) {
    const { data, error } = await supabase
      .from('event_attendees')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  }

  // Categories
  static async getCategories() {
    const { data, error } = await supabase
      .from('posts')
      .select('category')
      .not('category', 'is', null)

    if (error) throw error
    
    const categories = [...new Set(data.map(post => post.category))]
    return categories
  }

  // Search
  static async searchPosts(query: string, limit = 10) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
} 