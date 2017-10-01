import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default class NavbarAddButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  render () {
    return (
      <Icon name="md-add" type="ionicon" style={styles.addButton} onPress={this.props.onPress} />
    )
  }
}

const styles = StyleSheet.create({
  addButton: {
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
})
