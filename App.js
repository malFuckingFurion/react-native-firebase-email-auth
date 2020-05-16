import * as React from 'react';
// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// firebase db
import * as firebase from 'firebase';
// components
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();

// check firebase.apps to see if its loaded
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      header='null'
      headerMode='none'
    >
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}

      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}