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
  blue1,
  blue3,
  blue5,
  centeredContainer,
  textInput,
  textInputMarginTop,
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
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <View style={[ styles.form, styles.signInForm ]}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={this.updateFormField('email')}
                onSubmitEditing={() => this.passwordInput.focus()}
                placeholder="Email"
                placeholderTextColor="white"
                returnKeyType="next"
                style={styles.textInput}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={this.updateFormField('password')}
                onSubmitEditing={this.submitForm}
                placeholder="Password"
                placeholderTextColor="white"
                ref={passwordInput => this.passwordInput = passwordInput}
                returnKeyType="go"
                secureTextEntry={true}
                style={[ styles.textInput, textInputMarginTop ]}
              />
            </View>
            <TouchableOpacity style={[ styles.button, styles.signInButton ]} onPress={this.submitForm}>
              <Text style={styles.ctaText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: blue3,
    height: '100%',
    justifyContent: 'center',
  },
  signInButton: {
    marginTop: 40,
    width: '80%',
  },
  signInForm: {
    width: '80%',
  },
  button,
  ctaText,
  form,
  centeredContainer,
  textInput,
})
