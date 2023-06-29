import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import Button from '../UI/Button'
import { GlobalStyles } from '../../constants/styles'

const ExpenseForm = ({ isEditting, cancelHandler, onSubmit, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: { value: defaultValues ? defaultValues.description : '', isValid: true },
  })

  // const { amount, date, description } = inputValues

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInpus) => {
      return {
        ...currentInpus,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid Input', 'Please check your input values')
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: { value: currentInputs.description.value, isValid: descriptionIsValid },
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <>
      <KeyboardAvoidingView style={styles.rootContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
          <Input
            style={styles.rowInput}
            label={'Amount'}
            isValid={!inputs.amount.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              placeholder: 'Ej. 10.5',
              onChangeText: inputChangeHandler.bind(this, 'amount'),
              value: inputs.amount.value,
            }}
          />
          <Input
            style={styles.rowInput}
            label={'Date'}
            isValid={!inputs.date.isValid}
            textInputConfig={{
              keyboardType: 'default',
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              value: inputs.date.value,
              onChangeText: inputChangeHandler.bind(this, 'date'),
            }}
          />
        </View>
        <Input
          style={styles.rowInput}
          label={'Description'}
          isValid={!inputs.description.isValid}
          textInputConfig={{
            keyboardType: 'default',
            multiline: true,
            value: inputs.description.value,
            onChangeText: inputChangeHandler.bind(this, 'description'),
          }}
        />
        <View>
          {formIsInvalid && <Text style={styles.errorText}>Please check your entered data</Text>}
          <View style={styles.buttons}>
            <Button mode={'flat'} onPress={cancelHandler} style={styles.button}>
              Cancel
            </Button>

            <Button onPress={submitHandler} style={styles.button}>
              {isEditting ? 'Update' : 'Add'}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
    height: '40%',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
  },
})
