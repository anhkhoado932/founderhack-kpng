"use client"

import * as React from "react"
import { supabase } from "@/lib/supabase"

export function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = React.useState<string>("Testing...")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function testConnection() {
      try {
        // Test a simple query to verify connection
        const { data, error } = await supabase
          .from('posts')
          .select('count')
          .limit(1)

        if (error) {
          setError(`Connection failed: ${error.message}`)
          setConnectionStatus("❌ Failed")
        } else {
          setConnectionStatus("✅ Connected to Supabase!")
        }
      } catch (err) {
        setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setConnectionStatus("❌ Failed")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-muted/30">
      <h3 className="font-semibold mb-2">Supabase Connection Test</h3>
      <p className="text-sm text-muted-foreground mb-2">Status: {connectionStatus}</p>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-2">
        <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
        <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
      </div>
    </div>
  )
} 