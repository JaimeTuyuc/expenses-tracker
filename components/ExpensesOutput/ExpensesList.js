import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ExpenseItem from './ExpenseItem'

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

const ExpensesList = ({ expenses }) => {
  return (
    <>
      <View style={styles.container}>
        <FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={renderExpenseItem} />
      </View>
    </>
  )
}

export default ExpensesList

const styles = StyleSheet.create({
  container: {
    // height: '90%',
    marginVertical: 15,
    marginBottom: 70,
  },
})
