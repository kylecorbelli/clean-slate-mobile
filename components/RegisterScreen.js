import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'


export default class RegisterScreen extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <Text style={styles.headline}>Register Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 36,
  },
})
