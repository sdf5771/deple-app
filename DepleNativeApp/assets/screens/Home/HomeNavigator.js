import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';

function HomeNavigator() {
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
