import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Camera from 'react-native-camera'
import { Icon } from 'react-native-elements'
import { defaultHitSlop } from '../constants'

const { back, front } = Camera.constants.Type

export default class CameraScreen extends Component {
  state = {
    photoHasBeenTaken: false,
    photoPath: '',
    deviceCamera: back,
  }

  toggleFrontOrBackCamera = () => {
    const { deviceCamera } = this.state
    this.setState({
      deviceCamera: deviceCamera === front ? back : front,
    })
  }

  takePicture = async () => {
    try {
      const data = await this.camera.capture()
      this.setState({
        photoHasBeenTaken: true,
        photoPath: data.path,
      })
    } catch (error) {
      console.error(error)
    }
  }

  closePhotoPreview = () => {
    this.setState({
      photoHasBeenTaken: false,
      photoPath: '',
    })
  }

  discardPhoto = () => {
    this.closePhotoPreview()
  }

  initiateSavingPhoto = () => {
    const { photoPath } = this.state
    this.props.navigation.navigate('SavingPhotoModal', { photoPath })
    this.closePhotoPreview()
  }

  render () {
    const {
      deviceCamera,
      photoHasBeenTaken,
      photoPath,
    } = this.state
    return (
      <View style={styles.screen}>
        <View style={[ styles.photoConfirmation, { display: photoHasBeenTaken ? 'flex' : 'none' } ]}>
          {Boolean(photoPath) && <Image style={styles.photoPreview} source={{ uri: photoPath }} />}
          <TouchableOpacity style={styles.discardPhotoButton} hitSlop={defaultHitSlop} onPress={this.discardPhoto}>
            <Icon color="white" name="delete-forever" size={60} />
            <Text style={styles.photoActionText}>discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.savePhotoButton} hitSlop={defaultHitSlop} onPress={this.initiateSavingPhoto}>
            <Icon color="white"name="save" size={60} />
            <Text style={styles.photoActionText}>save</Text>
          </TouchableOpacity>
        </View>
        <Camera
          captureTarget={Camera.constants.CaptureTarget.disk}
          ref={camera => this.camera = camera}
          aspect={Camera.constants.Aspect.fill}
          style={styles.camera}
          type={deviceCamera}
        >
          <View style={styles.closeChevron}>
            <Icon color="white" name="ios-arrow-down" type="ionicon" />
          </View>
          <TouchableOpacity style={styles.swapCamera} onPress={this.toggleFrontOrBackCamera} hitSlop={defaultHitSlop}>
            <Icon color="white" name="ios-reverse-camera" type="ionicon" size={40} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureButton} onPress={this.takePicture}>
            <Icon color="white" name="camera" size={60} />
          </TouchableOpacity>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'stretch',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeChevron: {
    alignItems: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 25,
    zIndex: 100,
  },
  swapCamera: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  photoConfirmation: {
    alignItems: 'stretch',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  photoPreview: {
    flex: 1,
  },
  discardPhoto: {
    left: 20,
    position: 'absolute',
    top: 25,
    zIndex: 200,
  },
  takePictureButton: {
    bottom: 20,
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    position: 'absolute'
  },
  discardPhotoButton: {
    alignItems: 'center',
    bottom: 20,
    position: 'absolute',
    left: 20,
  },
  savePhotoButton: {
    alignItems: 'center',
    bottom: 20,
    position: 'absolute',
    right: 20,
  },
  photoActionText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 22,
  },
})
