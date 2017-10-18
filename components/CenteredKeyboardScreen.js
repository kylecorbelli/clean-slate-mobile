import React, { Component } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {
  blue3,
} from '../styles/shared'

export default class CenteredKeyBoardScreen extends Component {
  render = () => {
    return (
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
          <View style={styles.screen}>
            {this.props.children}
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
})
