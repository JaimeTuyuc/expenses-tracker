import { createContext, useReducer } from 'react'

// const DUMMY_EXPENSES = [
//   { id: 'e1', description: 'Watch The bing bang theory', amount: 89.4, date: new Date('2023-06-10') },
//   { id: 'e2', description: 'Eat pizza', amount: 2, date: new Date('2023-06-20') },
//   { id: 'e3', description: 'Go to the GYM', amount: 21.4, date: new Date('2023-06-20') },
//   { id: 'e4', description: 'Listen to music', amount: 89.4, date: new Date('2023-06-10') },
//   { id: 'e5', description: 'Learn French', amount: 2, date: new Date('2023-06-20') },
//   { id: 'e6', description: 'Practice React Native', amount: 79.4, date: new Date('2023-06-20') },

//   { id: 'e7', description: 'Eat pizza', amount: 2, date: new Date('2023-06-20') },
//   { id: 'e8', description: 'Go to the GYM', amount: 21.4, date: new Date('2023-06-10') },
//   { id: 'e9', description: 'Listen to music', amount: 89.4, date: new Date('2023-06-20') },
//   { id: 'a1', description: 'Learn French', amount: 2, date: new Date('2023-06-20') },
//   { id: 'a2', description: 'Practice React Native', amount: 79.4, date: new Date('2023-06-20') },
//   { id: 'g7', description: 'Eat pizza', amount: 2, date: new Date('2023-06-20') },
//   { id: 'g8', description: 'Go to the GYM', amount: 21.4, date: new Date('2023-06-10') },
//   { id: 'g9', description: 'Listen to music', amount: 89.4, date: new Date('2023-06-10') },
//   { id: 'g1', description: 'Learn French', amount: 2, date: new Date('2023-06-20') },
//   { id: 'g2', description: 'Practice React Native', amount: 79.4, date: new Date('2023-06-10') },
// ]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ description, amount, date }, id) => {},
  setExpenses: (expenses) => {},
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString()
      return [action.payload, ...state]
    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
    case 'UPDATE':
      const updatebleExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
      const updatableExpense = state[updatebleExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatebleExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses })
  }

  const value = {
    expenses: expensesState,

    addExpense: addExpense,

    deleteExpense: deleteExpense,

    updateExpense: updateExpense,

    setExpenses: setExpenses,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider
