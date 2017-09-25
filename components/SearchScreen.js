import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'


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
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 36,
  },
})
