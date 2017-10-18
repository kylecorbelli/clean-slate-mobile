import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

const ListNavbarTitle = ({ title }) => <Text>{title}</Text>

ListNavbarTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ListNavbarTitle
