import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {Provider} from 'react-redux'

import HomeScreen from './screens/HomeScreen.js'
import DetailsScreen from './screens/DetailsScreen.js'
import SettingsScreen from './screens/SettingsScreen.js'
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';

import { getStore, getPersistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'


const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRountName: 'Home',
    defaultNavigationOptions: {
      headerTitleStyle: {
        //fontFamily: 'serif',
      },
      headerStyle: {
        backgroundColor: '#f4511e'
      },
    },
  }
)

const MainDrawers = createDrawerNavigator(
  {
    Procedures: MainStack,
    Settings: SettingsScreen,
  },
  {
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: 'green',
      //fontFamily: 'serif',

    } 
  },
)


const AppNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Register: RegistrationScreen,
    Main: MainDrawers,
  }
)

const AppContainer =  createAppContainer(AppNavigator);

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