import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import CenteredKeyboardScreen from './CenteredKeyboardScreen'
import CloseModalButton from './CloseModalButton'
import {
  button,
  ctaText,
  form,
  textInput,
} from '../styles/shared'

export default class RenameListScreen extends Component {
  static propTypes = {
    updateList: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      textInput: props.list.title,
    }
  }

  updateInputText = (text) => {
    this.setState({ textInput: text })
  }

  updateListName = () => {
    Keyboard.dismiss()
    const {
      list: { id },
      navigation,
      updateList,
    } = this.props
    updateList(id, { title: this.state.textInput})
    navigation.goBack()
  }

  render = () => {
    const { list } = this.props
    return (
      <CenteredKeyboardScreen>
        <View style={styles.updateListNameMessage}>
          <Text style={styles.updateListText}>Renaming List</Text>
          <Text style={styles.updateListText}>"{list.title}"</Text>
        </View>
        <View style={[ form, styles.form ]}>
          <TextInput
            autoFocus={true}
            defaultValue={list.title}
            onChangeText={this.updateInputText}
            onSubmitEditing={this.updateListName}
            placeholder="New List Title"
            placeholderTextColor="white"
            returnKeyType="done"
            selectTextOnFocus={true}
            style={textInput}
          />
        </View>
        <TouchableOpacity style={[ button, styles.button ]} onPress={this.updateListName}>
          <Text style={ctaText}>Rename List</Text>
        </TouchableOpacity>
        <CloseModalButton navigation={this.props.navigation} />
      </CenteredKeyboardScreen>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    width: '80%',
  },
  button: {
    marginTop: 40,
    width: '80%',
  },
  updateListNameMessage: {
    alignItems: 'center',
    marginBottom: 80,
  },
  updateListText: {
    color: 'white',
    fontSize: 24,
  },
})
