import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  // TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import AppContainer from 'app/components/appContainer';
// import Button from 'app/components/button';
// import FastImage from 'react-native-fast-image';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { colors } from '../config/style';

export default class HomeScreen extends Component {


  render() {
    return (
      
      <View>
        <Text>Hello Axenu boilerplate</Text>
        <Icon name="rocket" size={30} color="#900" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  
});
