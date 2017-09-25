import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'


export default class ListsScreen extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <Text style={styles.headline}>Lists Screen</Text>
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
