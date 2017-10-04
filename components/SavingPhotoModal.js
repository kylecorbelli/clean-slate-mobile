import React, { Component } from 'react'
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

export default class SavingPhotoModal extends Component {
  state = {
    photoHasBeenSaved: false,
  }

  componentDidMount = () => {
    this.savePhoto()
  }

  savePhoto = async () => {
    const { navigation } = this.props
    const { photoPath } = navigation.state.params
    const base64Image = await RNFS.readFile(photoPath, 'base64')
    // We'll probably want to handle all this in a Thunk action and also send the data to our backend:
    const response = await axios({
      method: 'POST',
      url: 'https://api.cloudinary.com/v1_1/dk1ym28wm/image/upload',
      data: {
        file: `data:image/png;base64,${base64Image}`,
        upload_preset: 'nuxgzvk1',
      },
    })
    this.setState({
      photoHasBeenSaved: true,
    })
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
