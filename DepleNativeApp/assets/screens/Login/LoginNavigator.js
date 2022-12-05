import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';

function LoginNavigator(){
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default LoginNavigator;
