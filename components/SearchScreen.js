import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  blue3,
} from '../styles/shared'

export default class SearchScreen extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <Text style={styles.headline}>Search Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    color: blue3,
    fontSize: 36,
  },
})
