import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />

          {content}
        </View>
      </View>
    </>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    height: '100%',
  },
  innerContainer: {},
  infoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 32,
  },
})
