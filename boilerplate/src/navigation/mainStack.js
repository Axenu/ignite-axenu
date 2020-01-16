import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/home';

const StackNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
}, {

  initialRouteName: 'Home',

  navigationOptions: {
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#91E6AA',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      // fontWeight: 'bold',
      // fontSize: 25,
      alignSelf: 'center',
      // marginBottom: 20,
      fontFamily: 'Times New Roman',
      fontWeight: 'bold',
    },
  },
});

export default StackNavigator;
