import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext)
  return (
    <>
      <View style={styles.container}>
        <ExpensesOutput expenses={expenses} expensesPeriod={'All'} fallbackText={'No expenses yet'} />
      </View>
    </>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
})
