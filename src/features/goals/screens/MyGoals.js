import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header';

export default function MyGoalScreen() {
  return (
    <SafeAreaView>
      <Header/>
    </SafeAreaView>
  );
}