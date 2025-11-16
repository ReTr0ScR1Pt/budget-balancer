'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import { addBudgetEntry, getBudgetData, deleteBudgetEntry, BudgetEntry } from '@/lib/api'
import BudgetForm from './BudgetForm'
import BudgetChart from './BudgetChart'
import BudgetTable from './BudgetTable'
import styles from './Dashboard.module.css'

interface DashboardProps {
  setIsAuthenticated: (value: boolean) => void
}

export default function Dashboard({ setIsAuthenticated }: DashboardProps) {
  const [viewPeriod, setViewPeriod] = useState(12)
  const [year, setYear] = useState(new Date().getFullYear())
  const [budgetData, setBudgetData] = useState<BudgetEntry[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadBudgetData = async () => {
    setLoading(true)
    try {
      const data = await getBudgetData(year, viewPeriod)
      setBudgetData(data)
    } catch (err) {
      console.error('Failed to load budget data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBudgetData()
  }, [year, viewPeriod])

  const handleAddEntry = async (entry: BudgetEntry) => {
    try {
      await addBudgetEntry(entry)
      loadBudgetData()
    } catch (err: any) {
      alert('Failed to add entry: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteBudgetEntry(id)
        loadBudgetData()
      } catch (err) {
        alert('Failed to delete entry')
      }
    }
  }

  const handleLogout = async () => {
    await logout()
    setIsAuthenticated(false)
    router.push('/login')
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Budget Balancer</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </header>

      <div className={styles.content}>
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Year:</label>
            <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label>View Period:</label>
            <select value={viewPeriod} onChange={(e) => setViewPeriod(Number(e.target.value))}>
              <option value={6}>6 Months</option>
              <option value={12}>1 Year</option>
            </select>
          </div>
        </div>

        <BudgetForm onAdd={handleAddEntry} />

        {loading ? (
          <div className={styles.loading}>Loading budget data...</div>
        ) : (
          <>
            <BudgetChart data={budgetData} />
            <BudgetTable data={budgetData} onDelete={handleDelete} />
          </>
        )}
      </div>
    </div>
  )
}

