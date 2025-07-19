import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../Services/NavigationService';
import * as Screens from '../Screens/index';
import useReduxStore from '../Hooks/UseReduxStore';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { getState } = useReduxStore();
  const { onboarding } = getState('onboarding');
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
        {!onboarding && (
          <Stack.Screen
            name="OnBoardScreen"
            component={Screens.OnBoardScreen}
          />
        )}
        <Stack.Screen
          name="MyLocationScreen"
          component={Screens.MyLocationScreen}
        />
        <Stack.Screen name="AddMenuScreen" component={Screens.AddMenuScreen} />
        <Stack.Screen name="HomeScreen" component={Screens.HomeScreen} />

        <Stack.Screen
          name="AddLocationScreen"
          component={Screens.AddLocationScreen}
        />
        <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={Screens.RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
