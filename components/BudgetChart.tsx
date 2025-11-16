'use client'

import { BudgetEntry } from '@/lib/api'
import styles from './BudgetChart.module.css'

interface BudgetChartProps {
  data: BudgetEntry[]
}

interface MonthTotal {
  income: number
  expense: number
  savings: number
  month: number
  year: number
}

export default function BudgetChart({ data }: BudgetChartProps) {
  const calculateTotals = (): MonthTotal[] => {
    const totals: { [key: string]: MonthTotal } = {}
    
    data.forEach(entry => {
      const key = `${entry.year}-${entry.month}`
      if (!totals[key]) {
        totals[key] = { income: 0, expense: 0, savings: 0, month: entry.month, year: entry.year }
      }
      if (entry.type === 'income') {
        totals[key].income += entry.amount
      } else {
        totals[key].expense += entry.amount
      }
      totals[key].savings = totals[key].income - totals[key].expense
    })

    return Object.values(totals).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year
      return a.month - b.month
    })
  }

  const totals = calculateTotals()
  const maxAmount = Math.max(...totals.map(t => Math.max(t.income, t.expense)), 1)

  const formatMonth = (month: number, year: number) => {
    return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' })
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Budget Overview</h2>
      <div className={styles.chartContainer}>
        {totals.length === 0 ? (
          <div className={styles.noData}>No budget data available. Add entries to see your budget overview.</div>
        ) : (
          <div className={styles.chartBars}>
            {totals.map((total, index) => (
              <div key={index} className={styles.chartMonth}>
                <div className={styles.monthLabel}>{formatMonth(total.month, total.year)}</div>
                <div className={styles.barsContainer}>
                  <div className={`${styles.bar} ${styles.incomeBar}`} style={{ height: `${(total.income / maxAmount) * 100}%` }}>
                    <span className={styles.barLabel}>${total.income.toFixed(2)}</span>
                  </div>
                  <div className={`${styles.bar} ${styles.expenseBar}`} style={{ height: `${(total.expense / maxAmount) * 100}%` }}>
                    <span className={styles.barLabel}>${total.expense.toFixed(2)}</span>
                  </div>
                  <div className={`${styles.bar} ${styles.savingsBar}`} style={{ height: `${Math.abs(total.savings / maxAmount) * 100}%` }}>
                    <span className={styles.barLabel}>${total.savings.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.income}`}></div>
          <span>Income</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.expense}`}></div>
          <span>Expense</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.savings}`}></div>
          <span>Savings</span>
        </div>
      </div>
    </div>
  )
}

