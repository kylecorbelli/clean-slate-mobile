import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  blue3,
} from '../styles/shared'

export default class RegisterScreen extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Register</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: blue3,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 36,
  },
})
