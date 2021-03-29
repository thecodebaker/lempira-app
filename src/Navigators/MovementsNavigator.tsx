import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateMovement from '../views/CreateMovement';
import Movements from '../views/Movements';
const StackNavigator = createStackNavigator();

const AccountNavigator = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="main" component={Movements} />
      <StackNavigator.Screen name="create" component={CreateMovement} />
    </StackNavigator.Navigator>
  );
};

export default AccountNavigator;
