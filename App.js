import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/splash_screen';
import BookList from './src/book_list';
import BookForm from './src/book_form';
import BookDetail from './src/book_detail';

const Stack = createStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="BookList" component={BookList}/>
        <Stack.Screen name="BookForm" component={BookForm}/>
        <Stack.Screen name="BookDetail" component={BookDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};