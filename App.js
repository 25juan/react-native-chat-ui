/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Chat from "./src/example" ;

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Chat/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
