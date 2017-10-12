import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

export default class NewListScreen extends Component {
  static propTypes = {
    createList: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    title: '',
  }

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text })
  }

  createNewList = async () => {
    const { createList, navigation } = this.props
    Keyboard.dismiss()
    const list = await createList(this.state.title)
    navigation.navigate('List', { listId: list.id, title: list.title })
  }

  render () {
    return (
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
          <View style={styles.screen}>
            <View style={[ form, styles.newListForm ]}>
              <TextInput
                autoFocus={true}
                onChangeText={this.updateFormField('title')}
                onSubmitEditing={this.createNewList}
                placeholder="New List Title"
                placeholderTextColor="white"
                returnKeyType="done"
                style={textInput}
              />
            </View>
            <TouchableOpacity style={[ button, styles.newListButton ]} onPress={this.createNewList}>
              <Text style={ctaText}>Add New List</Text>
            </TouchableOpacity>
            <CloseModalButton navigation={this.props.navigation} />
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
  newListButton: {
    marginTop: 40,
    width: '80%',
  },
  newListForm: {
    width: '80%',
  },
})
