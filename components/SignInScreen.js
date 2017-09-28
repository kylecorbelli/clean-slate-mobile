import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  authButton,
  authCta,
  authForm,
  blue1,
  blue3,
  blue5,
  centeredContainer,
  textInput,
  textInputBorderTop,
} from '../styles/shared'
import CloseModalButton from './CloseModalButton'

export default class HomeScreen extends Component {
  state = {
    email: '',
    password: '',
  }

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text })
  }

  submitForm = async () => {
    const { signInUser } = this.props
    const { email, password } = this.state
    try {
      await signInUser({ email, password })
      this.navigateToRoute('Dashboard')
    } catch (error) {
      Alert.alert(
        'Error Signing In',
        'Looks like there was an error signing you in',
      )
    }
  }

  navigateToRoute = (route) => {
    this.props.navigation.navigate(route)
  }

  render () {
    return (
      <View style={styles.screen}>
        <View style={styles.centeredContainer}>
          <View style={styles.authForm}>
            <TextInput style={styles.textInput} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" onChangeText={this.updateFormField('email')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" onChangeText={this.updateFormField('password')} />
          </View>
          <TouchableOpacity style={styles.authButton} onPress={this.submitForm}>
            <Text style={styles.authCta}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredContainer}></View>
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
  authButton,
  authCta,
  authForm,
  centeredContainer,
  textInput,
  textInputBorderTop,
})
