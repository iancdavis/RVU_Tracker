import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {Provider} from 'react-redux'

import HomeScreen from './screens/HomeScreen.js'
import DetailsScreen from './screens/DetailsScreen.js'
import SettingsScreen from './screens/SettingsScreen.js'
import LoginScreen from './screens/LoginScreen.js';

import { getStore, getPersistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

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
    const myStore = getStore()
    const myPersistor = getPersistor()
    return (
      <Provider store={myStore}>
        <PersistGate
          persistor={myPersistor}
        >
          <AppContainer />
        </PersistGate>
      </Provider>

    )
  }
}