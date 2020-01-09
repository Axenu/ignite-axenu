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
// import * as Sentry from '@sentry/react-native';
// import DeviceInfo from 'react-native-device-info';
import AppNavigator from './src/navigation';
import Stores from './src/store';

// gets the current screen from navigation state
// function getActiveRouteName(navigationState) {
//   if (!navigationState) {
//     return null;
//   }
//   const route = navigationState.routes[navigationState.index];
//   // dive into nested navigators
//   if (route.routes) {
//     return getActiveRouteName(route);
//   }
//   return route.routeName;
// }

// function screenChanged(prevState, currentState) {
//   const currentRouteName = getActiveRouteName(currentState);
//   const previousRouteName = getActiveRouteName(prevState);

//   if (previousRouteName !== currentRouteName) {
//     firebase.analytics().setCurrentScreen(currentRouteName, currentRouteName);
//   }
// }

// if (!__DEV__) {
//   Sentry.init({
//     dsn: 'https://bc673e26e58746ce8a57c0b7db76bcdf@sentry.io/1850803',
//     release: `${DeviceInfo.getBundleId()}-${DeviceInfo.getVersion()}`,
//     dist: DeviceInfo.getBuildNumber(),
//   });

//   Sentry.setDist(DeviceInfo.getBuildNumber());
//   Sentry.setRelease(`${DeviceInfo.getBundleId()}-${DeviceInfo.getVersion()}`);
// }

Icon.loadFont();
// MatIcon.loadFont();


YellowBox.ignoreWarnings([
  // 'Warning: Async Storage has been extracted',
  // 'Battery state',
  // 'componentWillMount',
  // 'componentWillUpdate',
  // 'componentWillReceiveProps',
  'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
]);




// firebase.analytics().setAnalyticsCollectionEnabled(true);

// firebase.functions().useFunctionsEmulator('http://localhost:5000');  // TODO: Test so that this has not been called in production

// firebase.auth().signInAnonymously().then((user) => {
//   // console.log(user);
//   // console.log(store);
//   // store.dispatch(setUser(user));
//   Stores.store.setUser(user);
// });

export default class App extends React.Component {
  render() {
    return <Provider {...Stores}><AppNavigator /></Provider>;
  }
}
