import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'

export default class CloseModalButton extends Component {
  navigateBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    return (
      <TouchableOpacity style={styles.closeButton} onPress={this.navigateBack}>
        <Icon name="clear" color="white" />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 20,
  },
  closeX: {
    color: 'white',
    fontSize: 36,
  },
})
// <Text style={styles.closeX}>X</Text>
