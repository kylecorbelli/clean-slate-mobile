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
import AuthScreen from './components/AuthScreen'
import SplashScreenConnected from './containers/SplashScreenConnected'

const AuthRouter = TabNavigator({
  Register: {
    screen: RegisterScreenConnected,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="user-plus" type="font-awesome" color={tintColor} />,
    },
  },
  SignIn: {
    screen: SignInScreenConnected,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="sign-in" type="font-awesome" color={tintColor} />,
      tabBarLabel: 'Sign In',
    },
  },
}, {
  animationEnabled: true,
  initialRouteName: 'SignIn',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: blue1,
    style: {
      backgroundColor: 'white',
    },
  },
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
  animationEnabled: true,
  initialRouteName: 'Lists',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: blue1,
    style: {
      backgroundColor: 'white',
    },
  },
})

const Router = StackNavigator({
  Splash: {
    screen: SplashScreenConnected,
  },
  Auth: {
    screen: AuthRouter,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  Dashboard: {
    screen: DashboardRouter,
  },
}, {
  headerMode: 'none',
})

export default Router
