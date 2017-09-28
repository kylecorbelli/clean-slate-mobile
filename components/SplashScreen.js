import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  blue3,
  centeredContainer,
  yellow4,
} from '../styles/shared'

export default class SplashScreen extends Component {
  state = {
    timer: 0,
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        timer: 2000,
      })
    }, 2000)
  }

  shouldComponentUpdate = (nextProps) => {
    return !nextProps.hasSplashScreenBeenShown
  }

  componentWillUpdate = (nextProps, nextState) => {
    const {
      hasVerificationBeenAttempted,
      isCurrentUserSignedIn,
      navigation,
      setHasSplashScreenBeenShown,
    } = nextProps
    const { timer } = nextState
    if (hasVerificationBeenAttempted && timer === 2000) {
      const nextRoute = isCurrentUserSignedIn ? 'Lists' : 'SignIn'
      setHasSplashScreenBeenShown(true)
      navigation.navigate(nextRoute)
    }
  }

  render () {
    return (
      <View style={styles.screen}>
        <View style={[ centeredContainer, styles.branding ]}>
          <Text style={styles.title}>Clean Slate</Text>
          <Text style={styles.subtitle}>Clear Your Mind</Text>
        </View>
        <ActivityIndicator style={centeredContainer} color="white" size="large"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: blue3,
    height: '100%',
    justifyContent: 'space-around',
  },
  branding: {
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
  },
  subtitle: {
    color: yellow4,
    fontSize: 18,
    letterSpacing: 3,
    textAlign: 'center',
  },
})
