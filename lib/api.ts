import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export interface BudgetEntry {
  id?: number
  type: 'income' | 'expense'
  category: string
  amount: number
  month: number
  year: number
  description?: string
}

export const addBudgetEntry = async (entry: BudgetEntry) => {
  const response = await axios.post(`${API_URL}/budget`, entry)
  return response.data
}

export const getBudgetData = async (year: number, months: number = 12): Promise<BudgetEntry[]> => {
  const response = await axios.get(`${API_URL}/budget?year=${year}&months=${months}`)
  return response.data
}

export const deleteBudgetEntry = async (id: number) => {
  await axios.delete(`${API_URL}/budget/${id}`)
}

