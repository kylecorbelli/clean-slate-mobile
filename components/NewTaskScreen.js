import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import CloseModalButton from './CloseModalButton'
import {
  ctaText,
  button,
  form,
  blue3,
  textInput,
} from '../styles/shared'

export default class NewTaskScreen extends Component {
  render () {
    return (
      <View style={styles.screen}>
        <View style={[ form, styles.newListForm ]}>
          <TextInput placeholder="New Task Description" style={textInput} />
        </View>
        <TouchableOpacity style={[ button, styles.newListButton ]}>
          <Text style={[ ctaText ]}>Add New Task</Text>
        </TouchableOpacity>
        <CloseModalButton navigation={this.props.navigation} />
      </View>
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
  newListButton: {
    width: '80%',
  },
  newListForm: {
    width: '80%',
  },
})
