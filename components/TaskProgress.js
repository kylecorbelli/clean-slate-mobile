import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  blue2,
  blue4,
  yellow3,
  red4,
} from '../styles/shared'
import { randomListCompletionMessage } from '../services/greetings'

export default class TaskProgress extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  }

  percentCompleted = new Animated.Value(0)
  completionMessageOpacity = new Animated.Value(0)

  constructor (props) {
    super(props)
    const { progress } = props
    this.state = {
      completionMessage: randomListCompletionMessage()
    }
    this.percentCompleted = new Animated.Value(progress)
    this.completionMessageOpacity = new Animated.Value(progress === 1 ? 1 : 0)
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.progress === 1 && this.props.progress !== 1) {
      this.setState({
        completionMessage: randomListCompletionMessage(),
      })
    }
  }

  componentDidUpdate = () => {
    const { progress } = this.props
    Animated.timing(
      this.percentCompleted,
      {
        toValue: progress,
        duration: 250,
      },
    ).start()
    Animated.timing(
      this.completionMessageOpacity,
      {
        toValue: progress === 1 ? 1 : 0,
        duration: 250,
      },
    ).start()
  }

  getBarColor = (progress) => {
    if (progress === 1) {		
      return '#61BD4F'		
    } else if (progress >= 0.67) {		
      return blue4	
    } else if (progress >= 0.34) {		
      return yellow3		
    } else {		
      return red4		
    }
  }

  render = () => {
    const { progress } = this.props
    const { completionMessage } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.barTotal}>
          <Animated.View
            style={[
              styles.barCurrent,
              {
                backgroundColor: this.getBarColor(progress),
                width: this.percentCompleted.interpolate({
                  inputRange: [ 0, 1 ],
                  outputRange: [ '0%', '100%' ],
                }),
              },
            ]}
          >
          </Animated.View>
          <View style={styles.completedMessageContainer}>
            <Animated.Text
              style={[
                styles.completedMessagText,
                {
                  opacity: this.completionMessageOpacity,
                },
              ]}
            >
              {completionMessage}
            </Animated.Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    shadowColor: 'lightgray',
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 1,
    width: '100%',
    zIndex: 200,
  },
  percentTextContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  barTotal: {
    backgroundColor: '#efefef',
    borderColor: 'lightgray',
    borderRadius: 200,
    overflow: 'hidden',
    height: '55%',
    width: '90%',
  },
  barCurrent: {
    borderRadius: 200,
    height: '100%',
  },
  completedMessageContainer: {
    alignItems: 'center',
    borderRadius: 200,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  completedMessagText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '90%',
  }
})
