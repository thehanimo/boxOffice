/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './src/reducer';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Screen1 from './src/Screen1/Screen1';
import Screen2 from './src/Screen2/Screen2';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './RootNavigation';

const Stack = createStackNavigator();

const client = axios.create({});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));
console.disableYellowBox = true;
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
