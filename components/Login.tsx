'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/lib/auth'
import styles from './Auth.module.css'

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Login({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      setIsAuthenticated(true)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Budget Balancer</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

