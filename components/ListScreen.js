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
  blue4,
  blue5,
  darkGray,
  green,
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
        message: `You are about to delete the item "${task.name}". This action cannot be undone. Do you still wish to continue?`,
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
    this.props.navigation.navigate('Task', { taskId: task.id })
  }

  taskIcon = (task, percentOfTasksCompleted) => ({
    color: percentOfTasksCompleted === 1 ? green : blue3,
    name: task.isDone ? 'check-circle' : 'circle-thin',
    size: 35,
    style: {
      paddingBottom: 12,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 13,
      width: 50,
    },
    type: 'font-awesome',
  })

  taskTitleStyle = (task) => ({
    color: task.isDone ? 'darkgray' : darkGray,
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
        destructiveButtonIndex: 0,
        title: task.name,
      },
      (indexSelected) => actions[actionNames[indexSelected]](),
    )
  }

  calculatePercentOfTasksCompleted = (tasks) => {
    return tasks.length === 0
      ? 0
      : tasks.filter(task => task.isDone).length / tasks.length
  }

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
                    leftIcon={this.taskIcon(task, percentOfTasksCompleted)}
                    leftIconOnPress={this.toggleTaskIsDone(task)}
                    onLongPress={this.launchTaskActions(task)}
                    onPress={this.selectTask(task)}
                    title={task.name}
                    titleStyle={this.taskTitleStyle(task)}
                  />
                </Animated.View>
              ))
            }
          </List>
        </ScrollView>
        <AddEntityButton
          backgroundColor={blue1}
          color="white"
          iconName="plus"
          iconType="font-awesome"
          onPress={this.navigateToNewTaskScreen}
        />
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
