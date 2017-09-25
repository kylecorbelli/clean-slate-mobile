import React from 'react'
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'

import HomeScreen from './components/HomeScreen'
import ListsScreen from './components/ListsScreen'
import MeScreen from './components/MeScreen'
import RegisterScreen from './components/RegisterScreen'
import SearchScreen from './components/SearchScreen'
import SignInScreen from './components/SignInScreen'
import SplashScreen from './components/SplashScreen'

const AuthRouter = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Register: {
    screen: RegisterScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
  mode: 'modal',
})

const DashboardRouter = TabNavigator({
  Lists: {
    screen: ListsScreen,
  },
  Search: {
    screen: SearchScreen,
  },
  Me: {
    screen: MeScreen,
  },
}, {
  swipeEnabled: true,
})

const Router = StackNavigator({
  Auth: {
    screen: AuthRouter,
  },
  Dashboard: {
    screen: DashboardRouter,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'none',
})

export default Router
