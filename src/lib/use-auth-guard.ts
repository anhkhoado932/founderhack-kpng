'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'

interface UseAuthGuardOptions {
  redirectTo?: string
  requireAuth?: boolean
}

export function useAuthGuard({ redirectTo = '/auth-demo', requireAuth = true }: UseAuthGuardOptions = {}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        // Redirect to login if authentication is required but user is not logged in
        router.push(redirectTo)
      } else if (!requireAuth && user) {
        // Redirect away from auth pages if user is already logged in
        router.push('/')
      }
    }
  }, [user, isLoading, requireAuth, redirectTo, router])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  }
} 