import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function CustomButton() {
  return (
    <Pressable
      onPress={() => console.log('Pressed!')}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressedButton : styles.normalButton,
      ]}
    >
      <Text style={styles.buttonText}>Press me</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 5,
    },
    normalButton: {
      backgroundColor: 'blue',
    },
    pressedButton: {
      backgroundColor: 'darkblue',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
});
  