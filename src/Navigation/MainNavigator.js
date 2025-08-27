import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../Services/NavigationService';
import * as Screens from '../Screens/index';
import useReduxStore from '../Hooks/UseReduxStore';
import MybottomTabs from './bottomNavigation';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { getState } = useReduxStore();
  const { onboarding } = getState('onboarding');
  const { isLogin } = getState('Auth');
  return (
    <NavigationContainer
      ref={ref => {
        NavigationService.setRef(ref);
        // const p = NavigationService.getCurrentRoute(ref.getCurrentRoute());
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerShown: false,
        }}
      >
        {!isLogin && (
          <>
            <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
            <Stack.Screen
              name="RegisterScreen"
              component={Screens.RegisterScreen}
            />
          </>
        )}
        {/* {!onboarding && (
          <Stack.Screen
            name="OnBoardScreen"
            component={Screens.OnBoardScreen}
          />
        )} */}
        {isLogin && (
          <>
            <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
            <Stack.Screen name="OrderScreen" component={Screens.OrderScreen} />
            <Stack.Screen name="HomeScreen" component={Screens.HomeScreen} />

            <Stack.Screen
              name="ChangePasswordScreen"
              component={Screens.ChangePasswordScreen}
            />
            <Stack.Screen
              name="SettingScreen"
              component={Screens.SettingScreen}
            />
            <Stack.Screen
              name="MenuDetailScreen"
              component={Screens.MenuDetailScreen}
            />
            <Stack.Screen
              name="MyMenuScreen"
              component={Screens.MyMenuScreen}
            />
            <Stack.Screen
              name="AddMenuScreen"
              component={Screens.AddMenuScreen}
            />

            <Stack.Screen
              name="MyLocationScreen"
              component={Screens.MyLocationScreen}
            />

            <Stack.Screen
              name="AddLocationScreen"
              component={Screens.AddLocationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
