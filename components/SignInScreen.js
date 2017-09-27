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
  blue1,
  blue3,
  blue5,
  centeredContainer,
  textInput,
  textInputBorderTop,
} from '../styles/shared'
import CloseModalButton from './CloseModalButton'

export default class HomeScreen extends Component {
  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text })
  }

  submitForm = () => {
    this.navigateToRoute('Lists')
  }

  navigateToRoute = (route) => {
    this.props.navigation.navigate(route)
  }

  render () {
    return (
      <View style={styles.screen}>
        <View style={styles.centeredContainer}>
          <View style={styles.authForm}>
            <TextInput style={styles.textInput} autoFocus={true} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" onChangeText={this.updateFormField('email')} />
            <TextInput style={[ styles.textInput, styles.textInputBorderTop ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" onChangeText={this.updateFormField('password')} />
          </View>
          <TouchableOpacity style={styles.authButton} onPress={this.submitForm}>
            <Text style={styles.authCta}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centeredContainer}></View>
        <CloseModalButton navigation={this.props.navigation} />
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
