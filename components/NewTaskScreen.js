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
import { Icon } from 'react-native-elements'
import CloseModalButton from './CloseModalButton'
import CenteredKeyboardScreen from './CenteredKeyboardScreen'
import {
  ctaText,
  button,
  form,
  blue3,
  textInput,
} from '../styles/shared'

export default class NewTaskScreen extends Component {
  static propTypes = {
    createTask: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          listId: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
    list: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = {
    description: '',
  }

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text })
  }

  createNewTask = async () => {
    const { description } = this.state
    const { createTask, navigation } = this.props
    const { listId } = navigation.state.params
    Keyboard.dismiss()
    await createTask(description, listId)
    navigation.goBack()
  }

  render () {
    const { list } = this.props
    return (
      <CenteredKeyboardScreen>
        <View style={styles.newTaskMessage}>
          <Text style={styles.newTaskText}>New item in list</Text>
          <Text style={styles.newTaskText}>"{list.title}"</Text>
        </View>
        <View style={[ form, styles.newTaskForm ]}>
          <TextInput
            autoFocus={true}
            onChangeText={this.updateFormField('description')}
            onSubmitEditing={this.createNewTask}
            placeholder="New Item Description"
            placeholderTextColor="white"
            returnKeyType="done"
            style={textInput}
          />
        </View>
        <TouchableOpacity style={[ button, styles.newTaskButton ]} onPress={this.createNewTask}>
          <Text style={ctaText}>Add New Item</Text>
        </TouchableOpacity>
        <CloseModalButton navigation={this.props.navigation} />
      </CenteredKeyboardScreen>
    )
  }
}

const styles = StyleSheet.create({
  newTaskMessage: {
    alignItems: 'center',
    marginBottom: 80,
  },
  newTaskText: {
    color: 'white',
    fontSize: 24,
  },
  newTaskButton: {
    marginTop: 40,
    width: '80%',
  },
  newTaskForm: {
    width: '80%',
  },
})
