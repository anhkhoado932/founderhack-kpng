'use client'

import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { UserProfile } from '@/components/auth/user-profile'
import { AuthPage } from '@/components/auth/auth-page'

export default function AuthDemoPage() {
  const { user, isLoading } = useAuth()

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">KPng Auth Demo</h1>
            </div>
            {user && <UserProfile />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user ? (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {user.name || user.email}!
              </h2>
              <p className="text-gray-600 mb-6">
                You are successfully authenticated. This is a protected area of the application.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">User Information</h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  {user.name && <p><strong>Name:</strong> {user.name}</p>}
                  {user.avatar_url && <p><strong>Avatar:</strong> {user.avatar_url}</p>}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">What you can do:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Access protected content</li>
                  <li>View your profile information</li>
                  <li>Sign out when you're done</li>
                  <li>Your session will persist across page refreshes</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Authentication Required
              </h2>
              <p className="text-gray-600 mb-6">
                Please sign in or create an account to access the protected content.
              </p>
              <AuthPage />
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 