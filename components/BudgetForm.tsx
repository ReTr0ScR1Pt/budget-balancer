'use client'

import { useState } from 'react'
import { BudgetEntry } from '@/lib/api'
import styles from './BudgetForm.module.css'

interface BudgetFormProps {
  onAdd: (entry: BudgetEntry) => void
}

export default function BudgetForm({ onAdd }: BudgetFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('income')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      type,
      category,
      amount: parseFloat(amount),
      month,
      year,
      description
    })
    // Reset form
    setCategory('')
    setAmount('')
    setDescription('')
  }

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other Income']
  const expenseCategories = ['Housing', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other']

  return (
    <div className={styles.card}>
      <h2>Add Budget Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select category</option>
              {(type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Amount ($)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Month</label>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>
                  {new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              min="2020"
              max="2100"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note..."
            />
          </div>
        </div>

        <button type="submit">Add Entry</button>
      </form>
    </div>
  )
}

