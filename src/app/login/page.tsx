'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { AuthPage } from '@/components/auth/auth-page'
import { useEffect } from 'react'

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user && !isLoading) {
      router.push('/home')
    }
  }, [user, isLoading, router])

  const handleLoginSuccess = () => {
    // Redirect to home page after successful login
    router.push('/home')
  }

  // Show loading while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is already logged in, don't render the login form
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-bold text-foreground">KPNG</span>
            </div>
            <div className="text-sm text-gray-600">
              Welcome to your parenting journey
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <AuthPage onSuccess={handleLoginSuccess} defaultMode="login" />
      </main>
    </div>
  )
} 