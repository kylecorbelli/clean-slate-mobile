import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


export default class MeScreen extends Component {
  constructor (props) {
    super(props)
    this.navigateToRoute = this.navigateToRoute.bind(this)
  }

  navigateToRoute (route) {
    const { navigation } = this.props
    return (event) => {
      navigation.navigate(route)
    }
  }

  render () {
    return (
      <View style={styles.screen}>
        <Text style={styles.headline}>Me Screen</Text>
        <TouchableOpacity onPress={this.navigateToRoute('Splash')}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 36,
  },
})
