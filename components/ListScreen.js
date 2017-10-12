import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import { List, ListItem } from 'react-native-elements'
import {
  blue3,
  blue4,
  blue5,
  red1,
} from '../styles/shared'
import SwipeoutDeleteButton from './SwipeoutDeleteButton'

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

  taskSpinAnimations = {}
  taskDisappearAnimations = {}

  state = {
    taskInFocusId: 0,
  }

  constructor (props) {
    super(props)
    const { tasks } = props.list
    this.setTaskSpinAnimations(tasks)
    this.setTaskDisappearAnimations(tasks)
  }

  setTaskSpinAnimations = (tasks) => {
    this.taskSpinAnimations = tasks.reduce(
      (accumulatedTaskSpinAnimations, currentTask) => {
        return {
          ...accumulatedTaskSpinAnimations,
          [currentTask.id]: new Animated.Value(0),
        }
      },
      {},
    )
  }

  setTaskDisappearAnimations = (tasks) => {
    this.taskDisappearAnimations = tasks.reduce(
      (accumulatedTaskDisappearAnimations, currentTask) => {
        return {
          ...accumulatedTaskDisappearAnimations,
          [currentTask.id]: new Animated.Value(0),
        }
      },
      {},
    )
  }

  componentWillUpdate = (nextProps) => {
    const { tasks } = nextProps.list
    if (tasks.length !== this.props.list.tasks.length) {
      this.setTaskSpinAnimations(tasks)
      this.setTaskDisappearAnimations(tasks)
    }
  }

  deleteTaskWithConfirmation = (task) => (event) => {
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
            this.setState({
              taskInFocusId: 0,
            })
            Animated.timing(
              this.taskDisappearAnimations[task.id],
              {
                toValue: 1,
                duration: 500,
              },
            ).start(() => {
              this.props.deleteTask(task.id)
            })
          }
        }
      ],
    )
  }

  toggleTaskIsDone = (task) => async (event) => {
    Animated.timing(
      this.taskSpinAnimations[task.id],
      {
        toValue: 360,
        duration: 500,
      },
    ).start(() => {
      this.taskSpinAnimations[task.id].setValue(0)
    })
    this.props.updateTask(task.id, { isDone: !task.isDone })
  }

  swipeoutButtons = (task) => {
    return [
      {
        autoClose: true,
        backgroundColor: red1,
        component: <SwipeoutDeleteButton />,
        onPress: this.deleteTaskWithConfirmation(task),
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
    color: 'white',
    name: task.isDone ? 'check-circle' : 'circle-thin',
    size: 35,
    type: 'font-awesome',
  })

  taskContainerStyle = (task) => ({
    backgroundColor: task.isDone ? blue4 : blue3,
    borderColor: 'white',
    borderBottomWidth: 0,
    borderTopWidth: 1,
  })

  taskTitleStyle = (task) => ({
    color: 'white',
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
        style={styles.screen}
      >
        <List
          containerStyle={styles.listContainer}
        >
          {
            tasks.map((task, index) => (
              <Animated.View
                key={index}
                style={{
                  height: this.taskDisappearAnimations[task.id].interpolate({
                    inputRange: [ 0, 1 ],
                    outputRange: [ 56, 0 ],
                  }),
                  opacity: this.taskDisappearAnimations[task.id].interpolate({
                    inputRange: [ 0, 1 ],
                    outputRange: [ 1, 0 ],
                  }),
                  transform: [
                    {
                      rotateX: this.taskSpinAnimations[task.id].interpolate({
                        inputRange: [ 0, 360 ],
                        outputRange: [ '0deg', '360deg' ],
                      }),
                    },
                  ],
                }}
              >
                <Swipeout
                  backgroundColor="transparent"
                  close={taskInFocusId !== task.id}
                  onOpen={this.setTaskInFocusId(task.id)}
                  right={this.swipeoutButtons(task)}
                >
                  <ListItem
                    containerStyle={this.taskContainerStyle(task)}
                    leftIcon={this.taskIcon(task)}
                    leftIconOnPress={this.toggleTaskIsDone(task)}
                    onPress={this.selectTask(task)}
                    rightIcon={{ name: 'chevron-right', color: 'white' }}
                    title={task.description}
                    titleStyle={this.taskTitleStyle(task)}
                  />
                </Swipeout>
              </Animated.View>
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
    height: '100%',
  },
  listContainer: {
    backgroundColor: 'transparent',
    marginTop: -1,
  },
})
