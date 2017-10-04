import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { defaultHitSlop } from '../constants'

export default class TaskScreen extends Component {
  navigateToCamera = () => {
    this.props.navigation.navigate('TakeNewPhotoModal')
  }

  render () {
    return (
      <View style={styles.screen}>
        <TouchableOpacity hitSlop={defaultHitSlop} onPress={this.navigateToCamera}>
          <Icon name="add-a-photo" size={60} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})
