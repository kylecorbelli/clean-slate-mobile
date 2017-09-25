import React, { Component } from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.navigateToSignIn = this.navigateToSignIn.bind(this)
  }

  navigateToSignIn () {
    const { navigation } = this.props
    navigation.navigate('SignIn')
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Home Screen</Text>
        <Button
          onPress={this.navigateToSignIn}
          title="Sign In"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 48,
  },
})
