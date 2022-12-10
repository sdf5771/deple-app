import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign';

import Home from './Home';
import Feed from './Feed';
import Alarm from './Alarm';
import Setting from './Setting';

function HomeNavigator() {
  const Tab = createBottomTabNavigator();

  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'book' : 'book';
          } else if (route.name === 'Feed'){
            iconName = focused ? 'form' : 'form';
          } else if (route.name === 'Alarm'){
            iconName = focused ? 'pushpino' : 'pushpino';
          } else if (route.name === 'Setting'){
            iconName = focused ? 'setting' : 'setting';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Alarm" component={Alarm} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
