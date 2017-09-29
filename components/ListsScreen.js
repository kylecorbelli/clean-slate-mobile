import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import {
  blue1,
  blue3,
} from '../styles/shared'

export default class ListsScreen extends Component {
  selectList = list => event => {
    const { navigation } = this.props
    navigation.navigate('List', { list })
  }

  render () {
    const { lists } = this.props
    return (
      <List>
        {
          lists.map((list, index) => (
            <ListItem
              badge={{ value: list.tasks.filter(task => !task.isDone).length, containerStyle: { backgroundColor: blue1 } }}
              key={index}
              onPress={this.selectList(list)}
              title={list.title}
            />
          ))
        }
      </List>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: blue3,
    fontSize: 36,
  },
})

// <Text style={styles.title}>Lists Screen</Text>
