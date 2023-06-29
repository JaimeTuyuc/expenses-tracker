import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpenseRequest, storeExpense, updateExpenseRequest } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const ManageExpenses = ({ route, navigation }) => {
  const editExpenseId = route.params?.expenseId
  const isEditting = !!editExpenseId
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [error, setError] = useState()
  const { deleteExpense, updateExpense, addExpense, expenses } = useContext(ExpensesContext)

  const selectedExpense = expenses.find((expense) => expense.id === editExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditting ? 'Edit Expense' : 'Add Expense' })
  }, [navigation, isEditting])

  const deleteExpenseHandler = async () => {
    setIsSubmiting(true)
    try {
      await deleteExpenseRequest(editExpenseId)
      deleteExpense(editExpenseId)
      navigation.goBack()
    } catch (error) {
      setError('Unable to delete the expense')
    }
    setIsSubmiting(false)
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = async (data) => {
    setIsSubmiting(true)
    try {
      if (isEditting) {
        updateExpense(editExpenseId, data)
        await updateExpenseRequest(editExpenseId, data)
      } else {
        const expenseId = await storeExpense(data)
        addExpense({ ...data, id: expenseId })
      }
      navigation.goBack()
    } catch (error) {
      setError(`Unable to ${isEditting ? 'edit' : 'add'} the expense`)
    }
    setIsSubmiting(false)
  }

  const closeErrorOverlay = () => {
    setError(null)
  }

  if (error && !isSubmiting) {
    return <ErrorOverlay message={error} onPress={closeErrorOverlay} />
  }

  if (isSubmiting) {
    return <LoadingOverlay />
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ExpenseForm
            isEditting={isEditting}
            cancelHandler={cancelHandler}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense}
          />
        </View>

        {isEditting && (
          <View style={styles.deleteContainer}>
            <IconButton name={'trash'} size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
          </View>
        )}
      </View>
    </>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },

  formContainer: {
    flex: 1,
  },
})
