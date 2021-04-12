import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CreateMovement from '../views/CreateMovement';
import Movements from '../views/Movements';
const StackNavigator = createStackNavigator();

const MovementsNavigator = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Movements" component={Movements} />
      <StackNavigator.Screen name="CreateMovement" component={CreateMovement} />
    </StackNavigator.Navigator>
  );
};

export default MovementsNavigator;
