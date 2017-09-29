import React from 'react'
import { StyleSheet } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'
import { Icon } from 'react-native-elements'
import {
  blue1,
} from './styles/shared'

import ListsScreenConnected from './containers/ListsScreenConnected'
import ListScreenConnected from './containers/ListScreenConnected'
import TaskScreen from './components/TaskScreen'
import MeScreenConnected from './containers/MeScreenConnected'
import RegisterScreenConnected from './containers/RegisterScreenConnected'
import SearchScreen from './components/SearchScreen'
import SignInScreenConnected from './containers/SignInScreenConnected'
import SplashScreenConnected from './containers/SplashScreenConnected'
import BackButton from './components/BackButton'
import NavbarAddButton from './components/NavbarAddButton'
import NewListScreenConnected from './containers/NewListScreenConnected'
import NewTaskScreenConnected from './containers/NewTaskScreenConnected'

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
  initialRouteName: 'SignIn',
  tabBarOptions: {
    activeTintColor: blue1,
    style: {
      backgroundColor: 'white',
    },
  },
})

const ListsRouter = StackNavigator({
  ListOfLists: {
    screen: ListsScreenConnected,
    navigationOptions: ({ navigation }) => ({
      title: 'Lists',
      headerRight: <NavbarAddButton onPress={() => navigation.navigate('NewList')} />,
    }),
  },
  List: {
    screen: ListScreenConnected,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerLeft: <BackButton navigation={navigation} />,
      headerRight: <NavbarAddButton onPress={() => navigation.navigate('NewTask', { listId: navigation.state.params.listId })} />,
    }),
  },
  Task: {
    screen: TaskScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.task.description,
      headerLeft: <BackButton navigation={navigation} />,
    }),
  },
}, {
  navigationOptions: {
    headerStyle: {
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
    screen: ListsRouter,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="list" color={tintColor} />,
      title: 'Lists',
    },
  },
  Me: {
    screen: MeScreenConnected,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="perm-identity" color={tintColor} />,
    },
  },
}, {
  initialRouteName: 'Lists',
  tabBarOptions: {
    activeTintColor: blue1,
    style: {
      backgroundColor: 'white',
    },
  },
})

const ApplicationRouter = StackNavigator({
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
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'none',
})

const Router = StackNavigator({
  Application: {
    screen: ApplicationRouter,
  },
  NewList: {
    screen: NewListScreenConnected,
  },
  NewTask: {
    screen: NewTaskScreenConnected,
  }
}, {
  headerMode: 'none',
  mode: 'modal',
})

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
})

export default Router

