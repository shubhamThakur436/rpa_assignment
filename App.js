import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App

const styles = StyleSheet.create({})