import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class ListScreen extends Component {
  selectTask = task => event => {
    const { navigation } = this.props
    navigation.navigate('Task', { task })
  }

  render () {
    const { tasks } = this.props.navigation.state.params.list
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
