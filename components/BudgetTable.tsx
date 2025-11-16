'use client'

import { BudgetEntry } from '@/lib/api'
import styles from './BudgetTable.module.css'

interface BudgetTableProps {
  data: BudgetEntry[]
  onDelete: (id: number) => void
}

interface MonthData {
  month: number
  year: number
  entries: BudgetEntry[]
  income: number
  expense: number
}

export default function BudgetTable({ data, onDelete }: BudgetTableProps) {
  const groupByMonth = (): MonthData[] => {
    const grouped: { [key: string]: MonthData } = {}
    
    data.forEach(entry => {
      const key = `${entry.year}-${entry.month}`
      if (!grouped[key]) {
        grouped[key] = {
          month: entry.month,
          year: entry.year,
          entries: [],
          income: 0,
          expense: 0
        }
      }
      grouped[key].entries.push(entry)
      if (entry.type === 'income') {
        grouped[key].income += entry.amount
      } else {
        grouped[key].expense += entry.amount
      }
    })

    return Object.values(grouped).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })
  }

  const months = groupByMonth()

  const formatMonth = (month: number, year: number) => {
    return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  return (
    <div className={styles.card}>
      <h2>Budget Details</h2>
      {months.length === 0 ? (
        <div className={styles.noData}>No entries yet. Add your first budget entry above!</div>
      ) : (
        <div className={styles.tableContainer}>
          {months.map((monthData, index) => (
            <div key={index} className={styles.monthSection}>
              <div className={styles.monthHeader}>
                <h3>{formatMonth(monthData.month, monthData.year)}</h3>
                <div className={styles.monthSummary}>
                  <span className={`${styles.summaryItem} ${styles.income}`}>Income: ${monthData.income.toFixed(2)}</span>
                  <span className={`${styles.summaryItem} ${styles.expense}`}>Expense: ${monthData.expense.toFixed(2)}</span>
                  <span className={`${styles.summaryItem} ${styles.savings} ${monthData.income - monthData.expense >= 0 ? styles.positive : styles.negative}`}>
                    Savings: ${(monthData.income - monthData.expense).toFixed(2)}
                  </span>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {monthData.entries.map(entry => (
                    <tr key={entry.id}>
                      <td>
                        <span className={`${styles.typeBadge} ${styles[entry.type]}`}>
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </span>
                      </td>
                      <td>{entry.category}</td>
                      <td className={`${styles.amount} ${styles[entry.type]}`}>
                        {entry.type === 'income' ? '+' : '-'}${entry.amount.toFixed(2)}
                      </td>
                      <td>{entry.description || '-'}</td>
                      <td>
                        <button onClick={() => entry.id && onDelete(entry.id)} className={styles.deleteBtn}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

