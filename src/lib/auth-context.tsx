'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthService, AuthUser } from './auth-service'

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ user: AuthUser | null; error: any }>
  signUp: (email: string, password: string, name?: string) => Promise<{ user: AuthUser | null; error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
  updateProfile: (updates: { name?: string; avatar_url?: string }) => Promise<{ user: AuthUser | null; error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial user state
    const getInitialUser = async () => {
      try {
        const { user: currentUser } = await AuthService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error getting initial user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getInitialUser()

    // Listen to auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await AuthService.signIn({ email, password })
    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  const signUp = async (email: string, password: string, name?: string) => {
    const result = await AuthService.signUp({ email, password, name })
    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  const signOut = async () => {
    const result = await AuthService.signOut()
    if (!result.error) {
      setUser(null)
    }
    return result
  }

  const resetPassword = async (email: string) => {
    return await AuthService.resetPassword(email)
  }

  const updateProfile = async (updates: { name?: string; avatar_url?: string }) => {
    const result = await AuthService.updateProfile(updates)
    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 