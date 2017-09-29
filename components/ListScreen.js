import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class ListScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    list: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tasks: PropTypes.array.isRequired,
    })
  }

  selectTask = task => event => {
    const { navigation } = this.props
    navigation.navigate('Task', { task })
  }

  render () {
    const { tasks } = this.props.list
    return (
      <List>
        {
          tasks.map((task, index) => (
            <ListItem
              key={index}
              onPress={this.selectTask(task)}
              title={task.description}
              subtitle={(task.isDone ? 'Done' : 'Incomplete')}
            />
          ))
        }
      </List>
    )
  }
}
