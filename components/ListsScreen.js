import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActionSheetIOS,
  Alert,
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import {
  blue1,
  blue3,
  blue5,
  red1,
  red4,
  yellow3,
} from '../styles/shared'
import AddEntityButton from './AddEntityButton'

export default class ListsScreen extends Component {
  static propTypes = {
    deleteList: PropTypes.func.isRequired,
    fetchListsAndTasks: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    listsAndTasksAreLoading: PropTypes.bool.isRequired,
  }

  listDisappearAnimations = {}

  constructor (props) {
    super(props)
    this.setListDisappearAnimations(props.lists)
  }

  componentWillUpdate = (nextProps) => {
    const { lists } = nextProps
    if (lists.length !== this.props.lists.length) {
      this.setListDisappearAnimations(lists)
    }
  }

  setListDisappearAnimations = (lists) => {
    this.listDisappearAnimations = lists.reduce(
      (accumulatedListDisappearAnimations, currentList) => ({
        ...accumulatedListDisappearAnimations,
        [currentList.id]: new Animated.Value(0),
      }),
      {},
    )
  }

  selectList = (list) => (event) => {
    this.props.navigation.navigate('List', { listId: list.id, title: list.title })
  }

  deleteListWithConfirmation = (list) => {
    const actions = {
      'Confirm Delete': () => {
        Animated.timing(
          this.listDisappearAnimations[list.id],
          {
            toValue: 1,
            duration: 500,
          },
        ).start(() => {
          this.props.deleteList(list.id)
        })
      },
      'Cancel': () => {},
    }
    const actionNames = Object.keys(actions)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionNames,
        cancelButtonIndex: actionNames.length - 1,
        destructiveButtonIndex: 0,
        message: `You are about to delete list "${list.title}". This action cannot be undone. Do you still wish to continue?`,
        title: 'Delete List?',
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  launchListActions = (list) => (event) => {
    const { navigation } = this.props
    const actions = {
      'Rename List': () => {
        navigation.navigate('RenameList', { listId: list.id })
      },
      'Delete List': () => {
        this.deleteListWithConfirmation(list)
      },
      'Cancel': () => {},
    }
    const actionNames = Object.keys(actions)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionNames,
        cancelButtonIndex: actionNames.length - 1,
        destructiveButtonIndex: 1,
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  componentDidMount = () => {
    this.props.fetchListsAndTasks()
  }

  navigateToNewListScreen = () => {
    this.props.navigation.navigate('NewList')
  }

  render () {
    const {
      fetchListsAndTasks,
      lists,
      listsAndTasksAreLoading,
      navigation,
    } = this.props
    return (
      <View style={styles.screen}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={listsAndTasksAreLoading}
              onRefresh={fetchListsAndTasks}
            />
          }
        >
          <List containerStyle={styles.listContainer}>
            {
              lists.map((list, index) => (
                <Animated.View
                  key={index}
                  style={{
                    height: this.listDisappearAnimations[list.id].interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ 65, 0 ],
                    }),
                    justifyContent: 'center',
                    opacity: this.listDisappearAnimations[list.id].interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ 1, 0 ],
                    }),
                    transform: [
                      {
                        translateX: this.listDisappearAnimations[list.id].interpolate({
                          inputRange: [ 0, 1 ],
                          outputRange: [ 0 , 1000 ],
                        }),
                      },
                      {
                        translateY: this.listDisappearAnimations[list.id].interpolate({
                          inputRange: [ 0, 1 ],
                          outputRange: [ 0 , -100 ],
                        }),
                      },
                    ],
                  }}
                >
                  <ListItem
                    containerStyle={styles.individualListContainer}
                    onLongPress={this.launchListActions(list)}
                    onPress={this.selectList(list)}
                    title={list.title}
                  />
                </Animated.View>
              ))
            }
          </List>
        </ScrollView>
        <AddEntityButton onPress={this.navigateToNewListScreen} />
      </View>
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
    borderTopWidth: 1,
    marginTop: 0,
  },
  individualListContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    borderTopWidth: 0,
    height: '100%',
    justifyContent: 'center',
  },
})
