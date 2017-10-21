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
  blue3,
  blue4,
  blue5,
  red1,
} from '../styles/shared'
import AddEntityButton from './AddEntityButton'
import TaskProgress from './TaskProgress'

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

  deleteTaskWithConfirmation = (task) => {
    const actions = {
      'Confirm Delete': () => {
        Animated.timing(
          this.taskDisappearAnimations[task.id],
          {
            toValue: 1,
            duration: 500,
          },
        ).start(() => {
          this.props.deleteTask(task.id)
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
        message: `You are about to delete the item "${task.description}". This action cannot be undone. Do you still wish to continue?`,
        title: 'Delete Item?',
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
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

  selectTask = (task) => (event) => {
    const { navigation } = this.props
    navigation.navigate('Task', { task })
  }

  taskIcon = (task) => ({
    color: blue3,
    name: task.isDone ? 'check-circle' : 'circle-thin',
    size: 35,
    type: 'font-awesome',
  })

  taskTitleStyle = (task) => ({
    color: task.isDone ? 'darkgray' : '#444',
    fontStyle: task.isDone ? 'italic' : 'normal',
    textDecorationLine: task.isDone ? 'line-through' : 'none',
  })

  navigateToNewTaskScreen = () => {
    const {
      list,
      navigation,
    } = this.props
    navigation.navigate('NewTask', { listId: list.id })
  }

  launchTaskActions = (task) => (event) => {
    const actions = {
      'Edit Item Details': () => {
        this.props.navigation.navigate('Task', { task })
      },
      'Delete Item': () => {
        this.deleteTaskWithConfirmation(task)
      },
      'Cancel': () => {},
    }
    const actionNames = Object.keys(actions)
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionNames,
        cancelButtonIndex: actionNames.length - 1,
        destructiveButtonIndex: 1,
        title: task.description,
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  calculatePercentOfTasksCompleted = (tasks) => tasks.filter(task => task.isDone).length / tasks.length

  render () {
    const {
      fetchListsAndTasks,
      list: {
        tasks,
      },
      listsAndTasksAreLoading,
    } = this.props
    const percentOfTasksCompleted = this.calculatePercentOfTasksCompleted(tasks)
    return (
      <View style={styles.screen}>
        <TaskProgress progress={percentOfTasksCompleted} />
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
                    height: this.taskDisappearAnimations[task.id].interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ 65, 0 ],
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
                      {
                        translateX: this.taskDisappearAnimations[task.id].interpolate({
                          inputRange: [ 0, 1 ],
                          outputRange: [ 0 , 1000 ],
                        }),
                      },
                      {
                        translateY: this.taskDisappearAnimations[task.id].interpolate({
                          inputRange: [ 0, 1 ],
                          outputRange: [ 0 , -100 ],
                        }),
                      },
                    ],
                  }}
                >
                  <ListItem
                    containerStyle={styles.taskContainer}
                    leftIcon={this.taskIcon(task)}
                    onLongPress={this.launchTaskActions(task)}
                    onPress={this.toggleTaskIsDone(task)}
                    rightIcon={<View></View>}
                    title={task.description}
                    titleStyle={this.taskTitleStyle(task)}
                  />
                </Animated.View>
              ))
            }
          </List>
        </ScrollView>
        <AddEntityButton onPress={this.navigateToNewTaskScreen} />
      </View>
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
    marginTop: 0,
  },
  taskContainer: {
    backgroundColor: 'white',
    borderWidth: 0,
    height: '100%',
    justifyContent: 'center',
  },
})
