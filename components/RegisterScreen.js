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
  blue2,
  centeredContainer,
  textInput,
  textInputBorderTop,
} from '../styles/shared'
import CloseModalButton from './CloseModalButton'
import { registerUser } from '../redux-token-auth-config'

export default class RegisterScreen extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text })
  }

  submitForm = async () => {
    const { registerUser } = this.props
    const { firstName, email, password, passwordConfirmation } = this.state
    try {
      await registerUser({ firstName, email, password, passwordConfirmation })
      this.navigateToRoute('Lists')      
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Error Registering',
        'Looks like there was an error registering. Please try again.',
      )
    }
  }

  navigateToRoute = (path) => {
    const { navigation } = this.props
    navigation.navigate(path)
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.screen}>
        <View style={styles.centeredContainer}>
          <View style={styles.authForm}>
            <TextInput style={styles.textInput} autoCapitalize="words" autoCorrect={false} placeholder="First Name" onChangeText={this.updateFormField('firstName')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" onChangeText={this.updateFormField('email')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" onChangeText={this.updateFormField('password')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password Confirmation" onChangeText={this.updateFormField('passwordConfirmation')} />
          </View>
          <TouchableOpacity style={styles.authButton} onPress={this.submitForm}>
            <Text style={styles.authCta}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredContainer}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  authButton,
  authCta,
  authForm,
  centeredContainer,
  screen: {
    alignItems: 'center',
    backgroundColor: blue2,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  textInput,
  textInputBorderTop,
})
