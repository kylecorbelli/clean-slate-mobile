import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { blue1 } from '../styles/shared'

const AddEntityButton = ({ isPressable, onPress, style }) => {
  return (
    <Animated.View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon
          color="white"
          name="plus"
          
          type="font-awesome"
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

AddEntityButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: blue1,
    borderRadius: 1000,
    bottom: 15,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    shadowColor: 'darkgray',
    shadowOffset: {
      height: 3,
      width: 1,
    },
    shadowOpacity: 1,
    width: 60,
  },
})

export default AddEntityButton
