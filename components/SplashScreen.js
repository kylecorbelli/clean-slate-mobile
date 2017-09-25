import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


export default class SplashScreen extends Component {
  constructor (props) {
    super(props)
    this.navigateToRoute = this.navigateToRoute.bind(this)
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
        <Text style={styles.headline}>Splash Screen</Text>
        <TouchableOpacity onPress={this.navigateToRoute('Register')}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToRoute('SignIn')}>
          <Text>Sign In</Text>
        </TouchableOpacity>
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
    color: '#6dd8ff',
    fontSize: 36,
  },
})
