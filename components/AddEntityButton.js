import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { blue1 } from '../styles/shared'

const AddEntityButton = ({ backgroundColor, color, iconName, iconType, onPress }) => {
  return (
    <Animated.View>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor,
          },
        ]}
        onPress={onPress}
      >
        <Icon
          color={color}
          name={iconName}
          type={iconType}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

AddEntityButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
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
