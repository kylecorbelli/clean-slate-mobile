import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  blue1,
  blue3,
  blue5,
} from '../styles/shared'
import CloseModalButton from './CloseModalButton'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.navigateBack = this.navigateBack.bind(this)
    this.navigateToRoute = this.navigateToRoute.bind(this)
  }

  navigateBack () {
    const { navigation } = this.props
    navigation.goBack()
  }

  navigateToRoute (route) {
    const { navigation } = this.props
    return (event) => {
      navigation.navigate(route)
    }
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.screen}>
        <View style={styles.content}>
          <View style={styles.form}>
            <TextInput style={styles.textInput} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" />
            <TextInput style={[ styles.textInput, styles.passwordTextInput ]} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholder="Password" />
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={this.navigateToRoute('Lists')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <CloseModalButton navigation={navigation} />
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
  content: {
    alignItems: 'center',
    display: 'flex',
    flex: 10,
    justifyContent: 'center',
    width: '100%',
  },
  form: {
    backgroundColor: 'white',
    width: '80%',
  },
  textInput: {
    padding: 10,
  },
  passwordTextInput: {
    borderTopColor: blue3,
    borderTopWidth: 1,
  },
  signInButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    width: '80%',
  },
  signInText: {
    color: 'white',
    fontSize: 18,
  },
})
