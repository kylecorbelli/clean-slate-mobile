import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  blue3,
} from '../styles/shared'
import CloseModalButton from './CloseModalButton'

export default class RegisterScreen extends Component {
  render () {
    const { navigation } = this.props
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Register</Text>
        <CloseModalButton navigation={navigation} />
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
