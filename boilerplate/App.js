/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { } from 'react';
import { YellowBox } from 'react-native';

// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/auth';
// import '@react-native-firebase/functions';
// import '@react-native-firebase/firestore';
// import '@react-native-firebase/storage';
// import '@react-native-firebase/analytics';
import { Provider } from 'mobx-react';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppNavigator from './src/navigation';
import Stores from './src/store';

Icon.loadFont();
// MatIcon.loadFont();


YellowBox.ignoreWarnings([
  // 'Warning: Async Storage has been extracted',
  // 'Battery state',
  // 'componentWillMount',
  // 'componentWillUpdate',
  // 'componentWillReceiveProps',
  // 'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
]);

export default class App extends React.Component {
  render() {
    return <Provider {...Stores}><AppNavigator /></Provider>;
  }
}
