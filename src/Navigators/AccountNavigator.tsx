import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Accounts from '../views/Accounts';
import CreateAccount from '../views/CreateAccount';
const StackNavigator = createStackNavigator();

const AccountNavigator = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="main" component={Accounts} />
      <StackNavigator.Screen name="create" component={CreateAccount} />
    </StackNavigator.Navigator>
  );
};

export default AccountNavigator;