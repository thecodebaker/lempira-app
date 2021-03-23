import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "react-native-elements";
import { useColorScheme, AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider, useSelector, RootStateOrAny } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getStore, getPersistor } from "./src/redux/store";
import { LightTheme, DarkTheme } from "./src/themes";
import Movements from "./src/views/Movements";
import Login from "./src/views/Login";
import Settings from "./src/views/Settings";
import Signup from "./src/views/Signup";
import Stats from "./src/views/Stats";
import Accounts from "./src/views/Accounts";

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
            backgroundColor={colorScheme === "dark" ? "black" : "white"}
          />
          <Provider store={myStore}>
            <ThemeProvider
              theme={colorScheme === "dark" ? DarkTheme : LightTheme}
            >
              <NavigationContainer
                theme={colorScheme === "dark" ? DarkTheme : LightTheme}
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
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
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
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";
            if (route.name === "Movimientos") {
              iconName = focused
                ? "swap-horizontal"
                : "swap-horizontal-outline";
            } else if (route.name === "Ajustes") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Estadisticas") {
              iconName = focused ? "analytics" : "analytics-outline";
            } else if (route.name === "Cuentas") {
              iconName = focused ? "file-tray-full" : "file-tray-full-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#34AF4A",
          inactiveTintColor: colorScheme === "dark" ? "#FFFEFF" : "black",
        }}
      >
        <Tab.Screen name="Movimientos" component={Movements} />
        <Tab.Screen name="Estadisticas" component={Stats} />
        <Tab.Screen name="Cuentas" component={Accounts} />
        <Tab.Screen name="Ajustes" component={Settings} />
      </Tab.Navigator>
    );
};

export default AppContainer;
