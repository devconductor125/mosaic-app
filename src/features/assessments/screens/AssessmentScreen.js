import React, {useState, useEffect} from 'react'
import {SafeAreaView } from "react-native";
import Header from '../components/Header';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryScreen from './History';
import ReportScreen from './Report';
import HomeScreen from './Home';

const Tab = createMaterialTopTabNavigator();

function AssessScreenTab() {
  return (
    <Tab.Navigator
      initialRouteName="Report"
      screenOptions={{
        tabBarActiveTintColor: '#1D4348',
        tabBarLabelStyle: { fontSize: 14, textTransform: 'none', fontFamily: 'Roboto', fontWeight: '500'},
        tabBarStyle: { backgroundColor: '#f1f1f1' },
        tabBarIndicatorStyle: {backgroundColor: '#1D4348'}
      }}
    >
      <Tab.Screen
        name="AssessmentHome"
        component={HomeScreen}
        options={{ tabBarLabel: 'Self-Assessment' }}
      />
      <Tab.Screen
        name="AssessmentHistory"
        component={HistoryScreen}
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen
        name="AssessmentReport"
        component={ReportScreen}
        options={{ tabBarLabel: 'Report' }}
      />
    </Tab.Navigator>
  );
}

const AssessmentScreen = ({ navigation }) =>{
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <Header navigation={navigation} />
          <AssessScreenTab/>
        </SafeAreaView>
    )
}
export default AssessmentScreen;