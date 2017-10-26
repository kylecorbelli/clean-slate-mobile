import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActionSheetIOS,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native'
import { Icon } from 'react-native-elements'
import debounce from 'lodash/debounce'
import { defaultHitSlop } from '../constants'
import {
  blue1,
  blue5,
  darkGray,
} from '../styles/shared'
import Swiper from 'react-native-swiper'
import AddEntityButton from './AddEntityButton'

export default class TaskScreen extends Component {
  static propTypes = {
    list: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    task: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    const { name, description } = props.task
    this.state = {
      taskName: name,
      taskDescription: description,
    }
  }

  componentWillMount = () => {
    const { task, updateTask } = this.props
    this.updateTask = debounce(
      function () {
        const { taskName, taskDescription } = this.state
        updateTask(task.id, { name: taskName, description: taskDescription })
      },
      2000,
    )
  }

  launchAddPhotoActionSheet = () => {
    const { task } = this.props
    const actions = {
      'Take a Photo with Your Camera': () => {
        this.props.navigation.navigate('TakeNewPhotoModal', { taskId: task.id })
      },
      'Use an Existing Photo': () => {},
      'Cancel': () => {},
    }
    const actionNames = Object.keys(actions)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionNames,
        cancelButtonIndex: actionNames.length - 1,
        title: 'Add a New Photo'
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  launchDeletePhotoActionSheet = (imageId) => (event) => {
    const actions = {
      'Delete Photo': () => this.launchConfirmDeletePhotoActionSheet(imageId),
      'Cancel': () => {},
    }
    const actionNames = Object.keys(actions)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionNames,
        cancelButtonIndex: actionNames.length - 1,
        destructiveButtonIndex: 0,
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  launchConfirmDeletePhotoActionSheet = (imageId) => {
    const { deleteImage } = this.props
    const actions = {
      'Confirm Delete': () => deleteImage(imageId),
      'Cancel': () => {},
    }
    const actionNames = Object.keys(actions)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionNames,
        cancelButtonIndex: actionNames.length - 1,
        destructiveButtonIndex: 0,
        title: 'Deleting Photo',
        message: 'This action cannot be undone. Would you like to continue?',
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  updateInputField = (fieldName) => (text) => {
    this.setState({ [fieldName]: text })
    this.updateTask()
  }

  render () {
    const { taskName, taskDescription } = this.state
    const { list: { title }, images } = this.props
    return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.taskNameSection}>
            <TextInput
              blurOnSubmit={true}
              multiline={true}
              onChangeText={this.updateInputField('taskName')}
              returnKeyType="done"
              style={styles.taskNameText}
              value={taskName}
            />
          </View>
          <View style={styles.listNameSection}>
            <Text style={styles.listNameText}>
              in list <Text style={styles.listName}>{title}</Text>
            </Text>
          </View>
          <View style={styles.taskDescriptionSection}>
            <TextInput
              blurOnSubmit={true}
              multiline={true}
              onChangeText={this.updateInputField('taskDescription')}
              placeholder="Add a description"
              returnKeyType="done"
              style={styles.taskDescriptionText}
              value={taskDescription}
            />
          </View>
          <View style={styles.photoSection}>
            {
              Boolean(images.length) &&
              <Swiper showsPagination={false} style={styles.imageSwiper} loop={false} removeClippedSubviews={false}>
                {
                  images.map((image, index) => (
                    <TouchableWithoutFeedback key={index} onLongPress={this.launchDeletePhotoActionSheet(image.id)}>
                      <Image
                        source={{ uri: image.url }}
                        style={{ height: '100%' }}
                      />
                    </TouchableWithoutFeedback>
                  ))
                }
              </Swiper>
            }
          </View>
        </ScrollView>
        <AddEntityButton
          backgroundColor={darkGray}
          color="white"
          iconName="add-a-photo"
          iconType="material"
          onPress={this.launchAddPhotoActionSheet}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'stretch',
    backgroundColor: blue5,
    justifyContent: 'flex-start',
    minHeight: '100%',
  },
  scrollView: {
    width: '100%',
  },
  taskNameSection: {
    backgroundColor: blue1,
    minHeight: 75,
    padding: 15,
    width: '100%',
  },
  taskNameText: {
    color: 'white',
    fontSize: 26,
    width: '100%',
  },
  listNameSection: {
    backgroundColor: blue1,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listNameText: {
    color: 'white',
    fontSize: 18,
  },
  listName: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  taskDescriptionSection: {
    backgroundColor: 'white',
    shadowColor: 'lightgray',
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 1,
    minHeight: 50,
    padding: 15,
    width: '100%',
  },
  taskDescriptionText: {
    fontSize: 18,
  },
  photoSection: {
    alignItems: 'center',
    padding: 15,
  },
  imageSwiper: {
    // borderColor: 'red',
    // borderWidth: 1,
    height: 500,
  }
})
