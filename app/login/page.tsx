'use client'

import Login from '@/components/Login'
import { useState } from 'react'

export default function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  return <Login setIsAuthenticated={setIsAuthenticated} />
}

