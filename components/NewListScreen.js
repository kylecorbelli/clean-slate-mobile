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
    const rawList = await createList(this.state.title)
    const list = {
      ...rawList,
      tasks: [],
    }
    navigation.navigate('List', { listId: list.id, title: list.title })
  }

  render () {
    return (
      <View style={styles.screen}>
        <View style={[ form, styles.newListForm ]}>
          <TextInput autoFocus={true} placeholder="New List Title" style={textInput} onChangeText={this.updateFormField('title')} />
        </View>
        <TouchableOpacity style={[ button, styles.newListButton ]} onPress={this.createNewList}>
          <Text style={[ ctaText ]}>Add New List</Text>
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
