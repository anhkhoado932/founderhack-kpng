'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'

interface UserProfileProps {
  className?: string
}

export function UserProfile({ className = '' }: UserProfileProps) {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name || user.email}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-sm font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">
            {user.name || 'User'}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
      >
        {isLoading ? 'Signing out...' : 'Sign out'}
      </button>
    </div>
  )
} 