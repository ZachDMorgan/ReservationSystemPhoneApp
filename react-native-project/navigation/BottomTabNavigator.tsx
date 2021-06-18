/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ReservationListScreen from '../screens/ReservationListScreen';
import MakeReservationScreen from '../screens/MakeReservationScreen';
import HomeScreen from '../screens/HomeScreen'
import { BottomTabParamList, ReservationListParamList, MakeReservationParamList, HomeParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
        name="ReservationList"
        component={ReservationListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-pizza" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MakeReservation"
        component={MakeReservationNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-beer" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

const ReservationListStack = createStackNavigator<ReservationListParamList>();

function ReservationListNavigator() {
  return (
    <ReservationListStack.Navigator>
      <ReservationListStack.Screen
        name="ReservationListScreen"
        component={ReservationListScreen}
        options={{headerShown: false}}
      />
    </ReservationListStack.Navigator>
  );
}

const MakeReservationStack = createStackNavigator<MakeReservationParamList>();

function MakeReservationNavigator() {
  return (
    <MakeReservationStack.Navigator>
      <MakeReservationStack.Screen
        name="MakeReservationScreen"
        component={MakeReservationScreen}
        options={{headerShown: false}}
      />
    </MakeReservationStack.Navigator>
  );
}
