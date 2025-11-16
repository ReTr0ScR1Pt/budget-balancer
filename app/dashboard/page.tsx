'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, logout } from '@/lib/auth'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    checkAuth().then((auth) => {
      setIsAuthenticated(auth)
      if (!auth) {
        router.push('/login')
      }
    })
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        color: 'white' 
      }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <Dashboard setIsAuthenticated={setIsAuthenticated} />
}

