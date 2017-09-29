import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default class BackButton extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  }

  navigateBack = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <Icon
        onPress={this.navigateBack}
        name='md-arrow-round-back'
        type='ionicon'
        style={styles.backButton}
      />
    )
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    padding: 5,
  },
})
