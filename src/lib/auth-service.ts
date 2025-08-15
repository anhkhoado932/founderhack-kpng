import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  name?: string
  avatar_url?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  name?: string
}

export interface AuthError {
  message: string
  code?: string
}

export class AuthService {
  // Sign up with email and password
  static async signUp(credentials: SignupCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          },
        },
      })

      if (error) {
        return { user: null, error: { message: error.message, code: error.name } }
      }

      if (data.user) {
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar_url: data.user.user_metadata?.avatar_url,
        }
        return { user, error: null }
      }

      return { user: null, error: { message: 'Signup failed' } }
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } }
    }
  }

  // Sign in with email and password
  static async signIn(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        return { user: null, error: { message: error.message, code: error.name } }
      }

      if (data.user) {
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar_url: data.user.user_metadata?.avatar_url,
        }
        return { user, error: null }
      }

      return { user: null, error: { message: 'Login failed' } }
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } }
    }
  }

  // Sign out
  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error: error ? { message: error.message, code: error.name } : null }
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } }
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        return { user: null, error: { message: error.message, code: error.name } }
      }

      if (user) {
        const authUser: AuthUser = {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name,
          avatar_url: user.user_metadata?.avatar_url,
        }
        return { user: authUser, error: null }
      }

      return { user: null, error: null }
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } }
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      return { error: error ? { message: error.message, code: error.name } : null }
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } }
    }
  }

  // Update user profile
  static async updateProfile(updates: { name?: string; avatar_url?: string }): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      })

      if (error) {
        return { user: null, error: { message: error.message, code: error.name } }
      }

      if (data.user) {
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar_url: data.user.user_metadata?.avatar_url,
        }
        return { user, error: null }
      }

      return { user: null, error: { message: 'Profile update failed' } }
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } }
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name,
          avatar_url: session.user.user_metadata?.avatar_url,
        }
        callback(user)
      } else {
        callback(null)
      }
    })
  }
} 