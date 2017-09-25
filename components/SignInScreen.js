import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.navigateBack = this.navigateBack.bind(this)
    this.navigateToRoute = this.navigateToRoute.bind(this)
  }

  navigateBack () {
    const { navigation } = this.props
    navigation.goBack()
  }

  navigateToRoute (route) {
    const { navigation } = this.props
    return (event) => {
      navigation.navigate(route)
    }
  }

  render () {
    return (
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.headline}>Sign In Screen</Text>
          <TouchableOpacity onPress={this.navigateToRoute('Lists')}>
            <Text>Successful sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={this.navigateBack}>
          <Text style={styles.closeX}>X</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeX: {
    color: 'white',
    fontSize: 36,
  },
  screen: {
    alignItems: 'center',
    backgroundColor: '#6dd8ff',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flex: 10,
    justifyContent: 'center',
    width: '100%',
  },
  headline: {
    color: 'white',
    fontSize: 36,
  },
})
