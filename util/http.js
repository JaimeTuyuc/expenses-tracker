import axios from 'axios'

const BACKEND_URL = 'your firebase url'

export const storeExpense = async (expenseData) => {
  const expense = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData)

  return expense.data.name
}

export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`)

  const expenses = []

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    }

    expenses.push(expenseObj)
  }

  return expenses
}

export const updateExpenseRequest = (id, expenseData) => {
  // const response = await axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData)

  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData)
}

export const deleteExpenseRequest = (id) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
}
