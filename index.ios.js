/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import configureStore from './redux/configure-store'
import Router from './Router'
import { verifyCredentials } from './redux-token-auth-config'

const store = configureStore()

verifyCredentials(store)

export default class CleanSlateMobile extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('CleanSlateMobile', () => CleanSlateMobile);
