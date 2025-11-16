'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '@/lib/auth'
import Login from '@/components/Login'

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    checkAuth().then((auth) => {
      setIsAuthenticated(auth)
      if (auth) {
        router.push('/dashboard')
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

  return <Login setIsAuthenticated={setIsAuthenticated} />
}

