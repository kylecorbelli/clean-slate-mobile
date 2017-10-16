import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
})

const SwipeoutDeleteButton = ({ containerStyle }) => (
  <View style={[ styles.container, containerStyle ]}>
    <Text style={styles.text}>Delete</Text>
  </View>
)

SwipeoutDeleteButton.propTypes = {
  containerStyle: PropTypes.object,
}

export default SwipeoutDeleteButton
