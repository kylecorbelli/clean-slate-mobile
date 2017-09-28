import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  authButton,
  authCta,
  blue3,
} from '../styles/shared'

export default class MeScreen extends Component {
  navigateToRoute = (route) => {
    this.props.navigation.navigate(route)
  }
  
  signOut = async () => {
    const { signOutUser } = this.props
    try {
      await signOutUser()
      this.navigateToRoute('Auth')
    } catch (error) {
      Alert.alert(
        'Error Signing Out',
        'Looks like there was an error signing you out!',
      )
    }
  }

  render () {
    const { name } = this.props
    return (
      <View style={styles.screen}>
        <Text style={styles.headline}>{name}</Text>
        <TouchableOpacity style={[ authButton, styles.button ]} onPress={this.signOut}>
          <Text style={authCta}>Sign Out</Text>
        </TouchableOpacity>
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
  button: {
    width: '80%',
  },
  headline: {
    color: 'white',
    fontSize: 36,
  },
})
