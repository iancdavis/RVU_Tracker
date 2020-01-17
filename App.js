import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {Provider} from 'react-redux'

import HomeScreen from './screens/HomeScreen.js'
import DetailsScreen from './screens/DetailsScreen.js'
import SettingsScreen from './screens/SettingsScreen.js'
import store from './redux/store'
import LoginScreen from './screens/LoginScreen.js';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRountName: 'Home',
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontFamily: 'serif',
      },
      headerStyle: {
        backgroundColor: '#f4511e'
      },
    },
  }
)

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontFamily: 'serif',
        color: 'red'
      },
    },
  },
)

const AppContainer =  createAppContainer(
  createDrawerNavigator(
    {
      Login: LoginScreen,
      Home: HomeStack,
      Settings: SettingsStack,
    })
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>

    )
  }
}