import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables not found!')
  console.error('Required variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.error('Please check your .env.local file and restart the development server.')
  
  // In development, we can provide more helpful error messages
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      'Supabase environment variables are missing. Please check your .env.local file and restart the development server.'
    )
  }
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

// For server-side operations (if needed later)
// export const supabaseAdmin = createClient(
//   supabaseUrl!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false
//     }
//   }
// )

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          author_name: string
          author_avatar: string
          category: string
          tags: string[]
          likes_count: number
          comments_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          author_name: string
          author_avatar: string
          category: string
          tags?: string[]
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          author_name?: string
          author_avatar?: string
          category?: string
          tags?: string[]
          likes_count?: number
          comments_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          content: string
          author_id: string
          author_name: string
          author_avatar: string
          parent_id?: string
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          content: string
          author_id: string
          author_name: string
          author_avatar: string
          parent_id?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          content?: string
          author_id?: string
          author_name?: string
          author_avatar?: string
          parent_id?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          post_id?: string
          comment_id?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id?: string
          comment_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string
          comment_id?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          location: string
          max_attendees: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          location: string
          max_attendees: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          location?: string
          max_attendees?: number
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      event_attendees: {
        Row: {
          id: string
          event_id: string
          user_id: string
          user_name: string
          status: 'going' | 'maybe' | 'not_going'
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          user_name: string
          status?: 'going' | 'maybe' | 'not_going'
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          user_name?: string
          status?: 'going' | 'maybe' | 'not_going'
          created_at?: string
        }
      }
    }
  }
} 