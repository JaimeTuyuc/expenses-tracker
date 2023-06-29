import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDayMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext)
  // const [fetchedExpenses, setFetchedExpenses] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const getExpensesData = async () => {
      setIsFetching(true)
      try {
        const data = await fetchExpenses()
        setExpenses(data)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false)
    }
    getExpensesData()
  }, [])

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()

    const date7DaysAgo = getDayMinusDays(today, 7)

    // return expense.date > date7DaysAgo
    return expense.date >= date7DaysAgo && expense.date <= today
  })

  const closeErrorOverlay = () => {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onPress={closeErrorOverlay} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <>
      <View>
        <ExpensesOutput
          expenses={recentExpenses}
          expensesPeriod={'Last Seven days'}
          fallbackText={'No expenses for the last 7 days '}
        />
      </View>
    </>
  )
}

export default RecentExpenses
