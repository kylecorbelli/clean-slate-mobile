import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import { List, ListItem } from 'react-native-elements'
import { red1 } from '../styles/shared'

export default class ListScreen extends Component {
  static propTypes = {
    deleteTask: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    fetchListsAndTasks: PropTypes.func.isRequired,
    list: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tasks: PropTypes.array.isRequired,
    }),
    listsAndTasksAreLoading: PropTypes.bool.isRequired,
    updateTask: PropTypes.func.isRequired,
  }

  state = {
    taskInFocusId: 0,
  }

  deleteTaskWithConfirmation = (task) => (event) => {
    const { deleteTask } = this.props
    Alert.alert(
      'Delete Task?',
      `You are about to delete the task "${task.description}". This action cannot be undone. Do you still wish to continue?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({
              taskInFocusId: 0,
            })
          }
        },
        {
          text: 'Confirm',
          onPress: () => {
            deleteTask(task.id)
          }
        }
      ],
    )
  }

  toggleTaskIsDone = (task) => async (event) => {
    const { updateTask } = this.props
    await updateTask(task.id, { isDone: !task.isDone })
    this.setState({
      taskInFocusId: 0,
    })
  }

  swipeoutButtons = (task) => {
    const { deleteTask } = this.props
    return [
      {
        autoClose: true,
        backgroundColor: red1,
        onPress: this.deleteTaskWithConfirmation(task),
        text: 'Delete',
      },
    ]
  }

  selectTask = task => event => {
    const { navigation } = this.props
    navigation.navigate('Task', { task })
  }

  setTaskInFocusId = (taskInFocusId) => (event) => {
    this.setState({
      taskInFocusId,
    })
  }

  taskIcon = (task) => ({
    color: task.isDone ? 'lightgray' : '#444',
    name: task.isDone ? 'ios-checkbox-outline' : 'ios-square-outline',
    size: 40,
    type: 'ionicon',
  })

  taskTitleStyle = (task) => ({
    color: task.isDone ? 'lightgray' : '#444',
    fontStyle: task.isDone ? 'italic' : 'normal',
    textDecorationLine: task.isDone ? 'line-through' : 'none',
  })

  render () {
    const {
      fetchListsAndTasks,
      list: {
        tasks,
      },
      listsAndTasksAreLoading,
    } = this.props
    const { taskInFocusId } = this.state
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={listsAndTasksAreLoading}
            onRefresh={fetchListsAndTasks}
          />
        }
      >
        <List>
          {
            tasks.map((task, index) => (
              <Swipeout
                backgroundColor="transparent"
                close={taskInFocusId !== task.id}
                key={index}
                onOpen={this.setTaskInFocusId(task.id)}
                right={this.swipeoutButtons(task)}
              >
                <ListItem
                  leftIcon={this.taskIcon(task)}
                  leftIconOnPress={this.toggleTaskIsDone(task)}
                  onPress={this.selectTask(task)}
                  title={task.description}
                  titleStyle={this.taskTitleStyle(task)}
                />
              </Swipeout>
            ))
          }
        </List>
      </ScrollView>
    )
  }
}
