import React, { Component } from 'react'
import {
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
  blue3,
  centeredContainer,
  textInput,
  textInputBorderTop,
} from '../styles/shared'
import CloseModalButton from './CloseModalButton'

export default class RegisterScreen extends Component {
  state = {
    firstName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  constructor (props) {
    super(props)
    this.updateFormField = this.updateFormField.bind(this)
    this.navigateToRoute = this.navigateToRoute.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateFormField (fieldName) {
    return (event) => {
      this.setState({
        [fieldName]: event.nativeEvent.text,
      })
    }
  }

  submitForm () {
    this.navigateToRoute('Lists')
  }

  navigateToRoute (path) {
    const { navigation } = this.props
    navigation.navigate(path)
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.screen}>
        <View style={styles.centeredContainer}>
          <View style={styles.authForm}>
            <TextInput style={styles.textInput} autoFocus={true} autoCapitalize="words" autoCorrect={false} placeholder="First Name" onChange={this.updateFormField('firstName')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" onChange={this.updateFormField('email')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" onChange={this.updateFormField('password')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password Confirmation" onChange={this.updateFormField('passwordConfirmation')} />
          </View>
          <TouchableOpacity style={styles.authButton} onPress={this.submitForm}>
            <Text style={styles.authCta}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredContainer}></View>
        <CloseModalButton navigation={navigation} />
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
    backgroundColor: blue3,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  textInput,
  textInputBorderTop,
})
