import React from 'react'
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'
import {
  Icon,
} from 'react-native-elements'
import {
  blue1,
} from './styles/shared'

import HomeScreen from './components/HomeScreen'
import ListsScreen from './components/ListsScreen'
import MeScreenConnected from './containers/MeScreenConnected'
import RegisterScreenConnected from './containers/RegisterScreenConnected'
import SearchScreen from './components/SearchScreen'
import SignInScreenConnected from './containers/SignInScreenConnected'
import SplashScreen from './components/SplashScreen'

const AuthRouter = StackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Register: {
    screen: RegisterScreenConnected,
  },
  SignIn: {
    screen: SignInScreenConnected,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
  mode: 'modal',
})

const DashboardRouter = TabNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="search" color={tintColor} />,
    },
  },
  Lists: {
    screen: ListsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="list" color={tintColor} />,
    },
  },
  Me: {
    screen: MeScreenConnected,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="perm-identity" color={tintColor} />,
    },
  },
}, {
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: blue1,
    style: {
      backgroundColor: 'white',
    },
  },
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
