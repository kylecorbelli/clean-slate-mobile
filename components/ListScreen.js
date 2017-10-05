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
                  onPress={this.selectTask(task)}
                  title={task.description}
                  subtitle={(task.isDone ? 'Done' : 'Incomplete')}
                />
              </Swipeout>
            ))
          }
        </List>
      </ScrollView>
    )
  }
}
