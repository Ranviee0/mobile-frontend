import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchRestaurant from './SearchRestaurant';
import SearchFood from './SearchFood';
import OrdersScreen from './OrderScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Restaurants" component={SearchRestaurant} />
        <Stack.Screen
          name="Food"
          component={SearchFood}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
