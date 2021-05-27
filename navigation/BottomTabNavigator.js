import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import texts from '../constants/texts'

const BottomTab = createBottomTabNavigator();

const { title1, title2, title3 } = texts.screens

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Calendario"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name={title1}
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-calendar" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={title2}
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-heart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name={title3}
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-people" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const TabBarIcon = (props) => (
  <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
)

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

const TabOneNavigator = () => {
  const colorScheme = useColorScheme();

  return(
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{
          headerTitle: title1,
          headerTintColor:Colors[colorScheme].tabIconDefault,
          headerStyle: {
            backgroundColor: Colors[colorScheme].tint,
            elevation: 0,
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

const TabTwoNavigator = () => {
  const colorScheme = useColorScheme();

  return(
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: title2,
          headerTintColor:Colors[colorScheme].tabIconDefault,
          headerStyle: {
            backgroundColor: Colors[colorScheme].tint,
            elevation: 0,
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

const TabThreeNavigator = () => {
  const colorScheme = useColorScheme();

  return(
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          headerTitle: title3,
          headerTintColor:Colors[colorScheme].tabIconDefault,
          headerStyle: {
            backgroundColor: Colors[colorScheme].tint,
            elevation: 0,
          },
        }}
      />
    </TabThreeStack.Navigator>
  );
}

export default BottomTabNavigator;