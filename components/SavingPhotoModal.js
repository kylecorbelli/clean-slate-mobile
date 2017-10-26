import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import axios from 'axios'
import RNFS from 'react-native-fs'
import { Icon } from 'react-native-elements'
import { blue3 } from '../styles/shared'
import { graphql } from '../services/graphql'

export default class SavingPhotoModal extends Component {
  static propTypes = {
    addImage: PropTypes.func.isRequired,
  }
  
  state = {
    photoHasBeenSaved: false,
  }

  componentDidMount = () => {
    this.savePhoto()
  }

  savePhoto = async () => {
    const { navigation, addImage } = this.props
    const { photoPath, taskId } = navigation.state.params
    const base64Image = await RNFS.readFile(photoPath, 'base64')
    await addImage(taskId, photoPath, base64Image)
    this.setState({
      photoHasBeenSaved: true,
    })
    RNFS.unlink(photoPath)
    setTimeout(navigation.goBack, 1500)
  }

  render () {
    const { photoHasBeenSaved } = this.state
    return (
      <View style={styles.screen}>
        {!photoHasBeenSaved && <ActivityIndicator color="white" size="large" />}
        {
          photoHasBeenSaved &&
          <View>
            <Icon color="white" name="ios-checkmark-circle" type="ionicon" size={60} />
            <Text style={styles.successMessage}>Photo Saved!</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: blue3,
    flex: 1,
    justifyContent: 'center',
  },
  successMessage: {
    color: 'white',
    fontSize: 22,
  },
})
