import React, { Component } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  button,
  ctaText,
  form,
  blue3,
  centeredContainer,
  textInput,
  textInputMarginTop,
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
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <View style={[ styles.form, styles.registerForm ]}>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={this.updateFormField('firstName')}
                onSubmitEditing={() => this.emailInput.focus()}
                placeholder="First Name"
                placeholderTextColor="white"
                returnKeyType="next"
                style={styles.textInput}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={this.updateFormField('email')}
                onSubmitEditing={() => this.passwordInput.focus()}
                placeholder="Email"
                placeholderTextColor="white"
                ref={emailInput => this.emailInput = emailInput}
                returnKeyType="next"
                style={[ styles.textInput, textInputMarginTop ]}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.updateFormField('password')}
                onSubmitEditing={() => this.passwordConfirmationInput.focus()}
                placeholder="Password"
                placeholderTextColor="white"
                ref={passwordInput => this.passwordInput = passwordInput}
                returnKeyType="next"
                secureTextEntry={true}
                style={[ styles.textInput, textInputMarginTop ]}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.updateFormField('passwordConfirmation')}
                onSubmitEditing={this.submitForm}
                placeholder="Password Confirmation"
                placeholderTextColor="white"
                ref={passwordConfirmationInput => this.passwordConfirmationInput = passwordConfirmationInput}
                returnKeyType="join"
                secureTextEntry={true}
                style={[ styles.textInput, textInputMarginTop ]}
              />
            </View>
            <TouchableOpacity style={[ styles.button, styles.registerButton ]} onPress={this.submitForm}>
              <Text style={styles.ctaText}>Register</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  button,
  ctaText,
  form,
  centeredContainer,
  screen: {
    alignItems: 'center',
    backgroundColor: blue3,
    height: '100%',
    justifyContent: 'center',
  },
  registerForm: {
    width: '80%',
  },
  registerButton: {
    marginTop: 40,
    width: '80%',
  },
  textInput,
})
