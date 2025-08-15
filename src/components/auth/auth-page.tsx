'use client'

import { useState } from 'react'
import { LoginForm } from './login-form'
import { SignupForm } from './signup-form'

interface AuthPageProps {
  onSuccess?: () => void
  defaultMode?: 'login' | 'signup'
}

export function AuthPage({ onSuccess, defaultMode = 'login' }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode)

  const handleSuccess = () => {
    onSuccess?.()
  }

  const switchToSignup = () => setMode('signup')
  const switchToLogin = () => setMode('login')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to KPng</h1>
          <p className="mt-2 text-sm text-gray-600">
            Your parenting community platform
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {mode === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess}
            onSwitchToSignup={switchToSignup}
          />
        ) : (
          <SignupForm 
            onSuccess={handleSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
} 