import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  blue3,
} from '../styles/shared'

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
        <View style={styles.branding}>
          <Text style={styles.title}>Clean Slate</Text>
          <Text style={styles.subtitle}>clear your mind</Text>
        </View>
        <View style={styles.authOptions}>
          <TouchableOpacity style={[ styles.button, styles.registerButton ]} onPress={this.navigateToRoute('Register')}>
            <Text style={[ styles.ctaText, styles.registerText ]}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ styles.button, styles.signInButton ]} onPress={this.navigateToRoute('SignIn')}>
            <Text style={[ styles.ctaText, styles.signInText ]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  authOptions: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  branding: {
    alignItems: 'center',
    display: 'flex',
    flex: 5,
    justifyContent: 'center',
    width: '100%',
  },
  screen: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: blue3,
    fontSize: 36,
  },
  subtitle: {
    fontSize: 18,
    letterSpacing: 3.5,
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  registerButton: {
    backgroundColor: blue3,
  },
  ctaText: {
    fontSize: 18,
  },
  registerText: {
    color: 'white',
  },
  signInText: {
    color: blue3,
  },
})
