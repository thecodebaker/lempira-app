import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider, Icon } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Provider,
  useSelector,
  RootStateOrAny,
  useDispatch,
} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AccountsNavigator from './src/Navigators/AccountsNavigator';
import MovementsNavigator from './src/Navigators/MovementsNavigator';
import SettingsNavigator from './src/Navigators/SettingsNavigator';
import User from './src/Types/User';
import { getStore, getPersistor } from './src/redux/store';
import { getAccounts } from './src/redux/thunks/accounts';
import { getExchanges } from './src/redux/thunks/common';
import { getMovements } from './src/redux/thunks/movements';
import { LightTheme, DarkTheme } from './src/themes';
import Login from './src/views/Login';
import Signup from './src/views/Signup';
import Stats from './src/views/Stats';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppContainer = () => {
  const colorScheme = useColorScheme();
  const myStore = getStore();
  const myPersistor = getPersistor();
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <PersistGate persistor={myPersistor}>
          <StatusBar
            style="auto"
            backgroundColor={colorScheme === 'dark' ? 'black' : 'white'}
          />
          <Provider store={myStore}>
            <ThemeProvider
              useDark={colorScheme === 'dark'}
              theme={colorScheme === 'dark' ? DarkTheme : LightTheme}
            >
              <NavigationContainer
                theme={colorScheme === 'dark' ? DarkTheme : LightTheme}
              >
                <SafeAreaView
                  style={{
                    flex: 1,
                  }}
                >
                  <App />
                </SafeAreaView>
              </NavigationContainer>
            </ThemeProvider>
          </Provider>
        </PersistGate>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

const App = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.token !== undefined) {
      dispatch(getAccounts(user.token));
      dispatch(getMovements(user.token));
      dispatch(getExchanges(user.token));
    }
  }, []);
  const colorScheme = useColorScheme();
  if (user.token === undefined)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  else
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/prop-types, react/display-name
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = '';
            if (route.name === 'Movimientos') {
              iconName = 'swap-horizontal';
            } else if (route.name === 'Ajustes') {
              iconName = focused ? 'cog' : 'cog-outline';
            } else if (route.name === 'Estadisticas') {
              iconName = 'chart-bell-curve-cumulative';
            } else if (route.name === 'Cuentas') {
              iconName = focused ? 'archive' : 'archive-outline';
            }
            return (
              <Icon
                type="material-community"
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#34AF4A',
          inactiveTintColor: colorScheme === 'dark' ? '#FFFEFF' : 'black',
        }}
      >
        <Tab.Screen name="Movimientos" component={MovementsNavigator} />
        <Tab.Screen name="Estadisticas" component={Stats} />
        <Tab.Screen name="Cuentas" component={AccountsNavigator} />
        <Tab.Screen name="Ajustes" component={SettingsNavigator} />
      </Tab.Navigator>
    );
};

export default AppContainer;
