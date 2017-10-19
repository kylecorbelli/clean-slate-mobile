import React, { Component } from 'react'
import {
  Alert,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native'
import { Icon } from 'react-native-elements'

export default class EditListButton extends Component {
  state = {
    isPressed: false,
  }

  launchActionSheet = () => {
    const { navigation } = this.props
    const actions = {
      'Rename List': () => {
        navigation.navigate('RenameList', { listId: navigation.state.params.listId })
      },
      'Clear All Tasks': () => {
        Alert.alert('Gotta handle this still')
      },
      'Cancel': () => {},
    }
    ActionSheetIOS.showActionSheetWithOptions({
      options: Object.keys(actions),
      cancelButtonIndex: Object.keys(actions).length - 1,
      destructiveButtonIndex: 1,
    },
      (indexSelected) => actions[Object.keys(actions)[indexSelected]](),
    )
  }

  render = () => {
    const { isPressed } = this.state
    return (
      <Icon
        name="pencil-square-o"
        onPress={this.launchActionSheet}
        type="font-awesome"
        style={styles.icon}
      />
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
})
