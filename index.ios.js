/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import Router from './Router'

export default class CleanSlateMobile extends Component {
  render() {
    return (
      <Router />
    )
  }
}

AppRegistry.registerComponent('CleanSlateMobile', () => CleanSlateMobile);
