import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginNavigator from './assets/screens/Login/LoginNavigator';
import HomeNavigator from './assets/screens/Home/HomeNavigator';

import { StoreProvider, useStores } from "./assets/store/Context";
import {RootStore} from './assets/store/RootStore';
import {observer} from 'mobx-react';

const rootStore = new RootStore();

const App = () => {
  const {loginStore} = useStores(rootStore);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <NavigationContainer>
        <StoreProvider value={rootStore}>
          {loginStore.isLoggedIn ? <HomeNavigator /> : <LoginNavigator />}
        </StoreProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

export default observer(App);
