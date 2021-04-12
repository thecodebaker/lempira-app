import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AccountInfo from '../views/AccountInfo';
import Accounts from '../views/Accounts';
import CreateAccount from '../views/CreateAccount';
const StackNavigator = createStackNavigator();

const AccountsNavigator = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Accounts" component={Accounts} />
      <StackNavigator.Screen name="AccountInfo" component={AccountInfo} />
      <StackNavigator.Screen name="CreateAccount" component={CreateAccount} />
    </StackNavigator.Navigator>
  );
};

export default AccountsNavigator;
