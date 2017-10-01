import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
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
    list: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tasks: PropTypes.array.isRequired,
    })
  }

  state = {
    taskInFocusId: 0,
  }

  swipeoutButtons = (task) => {
    const { deleteTask } = this.props
    return [
      {
        autoClose: true,
        backgroundColor: red1,
        onPress: () => {
          deleteTask(task.id)
        },
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
    const { tasks } = this.props.list
    const { taskInFocusId } = this.state
    return (
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
    )
  }
}
