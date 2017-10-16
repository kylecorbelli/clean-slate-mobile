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
  blue5,
  red1,
  red4,
  yellow3,
} from '../styles/shared'
import SwipeoutDeleteButton from './SwipeoutDeleteButton'

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
        component: <SwipeoutDeleteButton containerStyle={{ borderColor: 'lightgray', borderTopWidth: 1 }} />,
        onPress: this.deleteListWithConfirmation(list),
      },
    ]
  }

  componentDidMount = () => {
    this.props.fetchListsAndTasks()
  }

  completedFractionCount = (list) => {
    const { tasks } = list
    return `${tasks.filter(task => task.isDone).length} / ${tasks.length}`
  }

  completedFractionContainerStyle = (list) => {
    const { tasks } = list
    const completedRatio = tasks.filter(task => task.isDone).length / tasks.length
    let backgroundColor
    if (completedRatio === 1) {
      backgroundColor = blue1
    } else if (completedRatio >= 0.67) {
      backgroundColor = blue3
    } else if (completedRatio >= 0.34) {
      backgroundColor = yellow3
    } else {
      backgroundColor = red4
    }
    return { backgroundColor }
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
        style={styles.screen}
      >
        <List containerStyle={styles.listContainer}>
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
                  badge={{ value: this.completedFractionCount(list), containerStyle: this.completedFractionContainerStyle(list) }}
                  containerStyle={styles.individualListContainer}
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
    backgroundColor: blue5,
    flex: 1,
  },
  listContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    marginTop: 0,
  },
  individualListContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderColor: 'lightgray',
    borderTopWidth: 1,
  },
})
