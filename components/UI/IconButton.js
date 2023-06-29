import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ name, size, color, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => (pressed ? pressed : null)}>
        <View style={styles.buttonContainer}>
          <Ionicons name={name} size={size} color={color} />
        </View>
      </Pressable>
    </>
  )
}

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
})
