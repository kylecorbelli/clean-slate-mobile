import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import {
  blue1,
  blue3,
  red1,
} from '../styles/shared'

export default class ListsScreen extends Component {
  static propTypes = {
    deleteList: PropTypes.func.isRequired,
    fetchListsAndTasks: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    listsAndTasksAreLoading: PropTypes.bool.isRequired,
  }

  state = {
    listInFocusId: 0,
  }

  setListInFocusId = (listInFocusId) => (event) => {
    this.setState({
      listInFocusId,
    })
  }

  selectList = list => event => {
    const { navigation } = this.props
    navigation.navigate('List', { listId: list.id, title: list.title })
  }

  deleteListWithConfirmation = (list) => (event) => {
    const { deleteList } = this.props
    Alert.alert(
      'Delete List?',
      `You are about to delete the list "${list.title}". This action cannot be undone. Do you still wish to continue?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({
              listInFocusId: 0,
            })
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            deleteList(list.id)
          },
        },
      ],
    )
  }

  swipeoutButtons = (list) => {
    return [
      {
        autoClose: true,
        backgroundColor: red1,
        onPress: this.deleteListWithConfirmation(list),
        text: 'Delete',
      },
    ]
  }

  componentDidMount = () => {
    this.props.fetchListsAndTasks()
  }

  render () {
    const {
      fetchListsAndTasks,
      lists,
      listsAndTasksAreLoading,
    } = this.props
    const { listInFocusId } = this.state
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
            lists.map((list, index) => (
              <Swipeout
                backgroundColor="transparent"
                close={list.id !== listInFocusId}
                key={index}
                onOpen={this.setListInFocusId(list.id)}
                right={this.swipeoutButtons(list)}
              >
                <ListItem
                  badge={{ value: list.tasks.filter(task => !task.isDone).length, containerStyle: { backgroundColor: blue1 } }}
                  onPress={this.selectList(list)}
                  title={list.title}
                />
              </Swipeout>
            ))
          }
        </List>
      </ScrollView>
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
