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
} from 'react-native'
import { Icon } from 'react-native-elements'
import debounce from 'lodash/debounce'
import { defaultHitSlop } from '../constants'
import {
  blue1,
  blue5,
} from '../styles/shared'

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

  launchActionSheet = () => {
    const actions = {
      'Take a Photo with Your Camera': () => {
        this.props.navigation.navigate('TakeNewPhotoModal')
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
      (indexSelected) => actions[actionNames[indexSelected]]()
    )
  }

  updateInputField = (fieldName) => (text) => {
    this.setState({ [fieldName]: text })
    this.updateTask()
  }

  render () {
    const { taskName, taskDescription } = this.state
    const { list: { title } } = this.props
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
            <Text style={styles.photoHeadline}>Photos</Text>
            <TouchableOpacity
              hitSlop={defaultHitSlop}
              onPress={this.launchActionSheet}
            >
              <Icon name="add-a-photo" size={60} />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    height: '100%',
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
  photoHeadline: {
    fontSize: 18,
    width: '100%',
  },
})
