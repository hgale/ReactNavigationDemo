/**
 * Demo used to illustrate potential performance issues with react-navigation
 * TODO: Add link to github repo
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import PushScreen from './js/screens/push'

import configureStore from './store'

const store = configureStore()

export const AppNavigator = StackNavigator({
  PushScreen: {
    screen: PushScreen
  }
});


export default class ReactNavigationDemo extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
