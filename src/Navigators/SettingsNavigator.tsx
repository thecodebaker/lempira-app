import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Categories from '../views/Categories';
import CreateCategory from '../views/CreateCategory';
import Settings from '../views/Settings';

const StackNavigator = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Settings" component={Settings} />
      <StackNavigator.Screen name="Categories" component={Categories} />
      <StackNavigator.Screen name="CreateCategory" component={CreateCategory} />
    </StackNavigator.Navigator>
  );
};

export default SettingsNavigator;
