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

  taskSpinAnimations = {}

  state = {
    taskInFocusId: 0,
  }

  constructor (props) {
    super(props)
    this.setTaskSpinAnimations(props.list.tasks)
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

  componentWillUpdate = (nextProps) => {
    if (nextProps.list.tasks.length !== this.props.list.tasks.length) {
      this.setTaskSpinAnimations(nextProps.list.tasks)
    }
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
        <List
          containerStyle={styles.listContainer}
        >
          {
            tasks.map((task, index) => (
              <Animated.View
                key={index}
                style={{
                  transform: [{
                    rotateX: this.taskSpinAnimations[task.id].interpolate({
                      inputRange: [ 0, 360 ],
                      outputRange: [ '0deg', '360deg' ],
                    }),
                  }],
                }}
              >
                <Swipeout
                  backgroundColor="transparent"
                  close={taskInFocusId !== task.id}
                  onOpen={this.setTaskInFocusId(task.id)}
                  right={this.swipeoutButtons(task)}
                >
                  <ListItem
                    containerStyle={styles.listItemContainer}
                    leftIcon={this.taskIcon(task)}
                    leftIconOnPress={this.toggleTaskIsDone(task)}
                    onPress={this.selectTask(task)}
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
  listContainer: {
    backgroundColor: 'transparent',
  },
  listItemContainer: {
    backgroundColor: 'white',
  },
})
