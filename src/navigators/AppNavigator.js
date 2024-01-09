import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Text, Button } from 'react-native';

import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import LandingScreen from '../features/landing/screens/LandingScreen';
import VerificationScreen from '../features/auth/screens/VerificationScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import CheckEmailScreen from '../features/auth/screens/CheckEmailScreen';
import NewPasswordScreen from '../features/auth/screens/NewPasswordScreen';
import AssessmentScreen from '../features/assessments/screens/AssessmentScreen';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import MyActionPlan from '../features/plans/screens/MyActionPlan';
import MyGoals from '../features/goals/screens/MyGoals';
import MyJournal from '../features/journals/screens/MyJournal';
import Resource from '../features/resources/screens/Resource';
import AgreeTermsPrivacyScreen from '../features/termsprivacy/screens/AgreeTermsPrivacyScreen';
import PricingScreen from '../features/stripe/screens/PricingScreen';
import CheckoutScreen from '../features/stripe/screens/CheckoutScreen';
import TermsScreen from '../features/termsprivacy/screens/TermsScreen';
import PrivacyScreen from '../features/termsprivacy/screens/PrivacyScreen';
import DrawerComponent from '../components/DrawerComponent';
import NewAssessmentScreen from '../features/assessments/screens/NewAssessmentScreen';
import SurveyCompletionScreen from '../features/assessments/screens/CompletionScreen';

import { grayScale500 } from '../utils/colors';

const homeIcon  = require('../assets/img/icons/bottomTab/home.png');
const assessIcon  = require('../assets/img/icons/bottomTab/assessment.png');
const planIcon = require('../assets/img/icons/bottomTab/plan.png');
const goalsIcon = require('../assets/img/icons/bottomTab/goals.png');
const journalIcon = require('../assets/img/icons/bottomTab/journal.png');
const resourceIcon = require('../assets/img/icons/bottomTab/resource.png');
const activeHomeIcon  = require('../assets/img/icons/bottomTab/home_active.png');
const activeAssessIcon  = require('../assets/img/icons/bottomTab/assessment_active.png');
const activePlanIcon = require('../assets/img/icons/bottomTab/plan_active.png');
const activeGoalsIcon = require('../assets/img/icons/bottomTab/goals_active.png');
const activeJournalIcon = require('../assets/img/icons/bottomTab/journal_active.png');
const activeResourceIcon = require('../assets/img/icons/bottomTab/resource_active.png');

const headerOption = {
    title: null,
    headerBackTitle: 'Back',
    headerBackTitleStyle: {
        fontFamily: 'Roboto',
        color: grayScale500,
        fontSize: 16,
        fontWeight: '400',
    },
    headerBackImage: ()=> (
      <Image
        source={require('./../assets/img/back.png')}
        style={{ width: 20, height: 20, marginLeft: 10 }}
      />
    )
}

const linking = {
    prefixes: ['MosaicLifeApp://', 'https://mosaiclifeapp.link.handler']
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainTab = () => (
    <Tab.Navigator initialRouteName='DashboardScreen'>
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false, title: 'Home',  tabBarIcon: (({focused, size}) => focused ? <Image source={activeHomeIcon} width={size} height={size}/> : <Image source={homeIcon} width={size} height={size}/>) }}/>
      <Tab.Screen name="AssessmentScreen" component={AssessmentScreen} options={{ headerShown: false, title: 'Assessments', tabBarIcon: (({focused, size}) => focused ? <Image source={activeAssessIcon} width={size} height={size}/> : <Image source={assessIcon} width={size} height={size}/> ) }}/>
      {/* <Tab.Screen name="MyActionPlan" component={MyActionPlan} options={{ headerShown: false, title: 'Action Plan',  tabBarIcon: (({focused, size}) => focused ? <Image source={activePlanIcon} width={size} height={size}/> : <Image source={planIcon} width={size} height={size}/>) }}/> */}
      <Tab.Screen name="MyGoals" component={MyGoals} options={{ headerShown: false, title: 'Goals',  tabBarIcon: (({focused, size}) => focused ? <Image source={activeGoalsIcon} width={size} height={size}/> : <Image source={goalsIcon} width={size} height={size}/>) }}/>
      <Tab.Screen name="MyJournal" component={MyJournal} options={{ headerShown: false, title: 'Journal',  tabBarIcon: (({focused, size}) => focused ? <Image source={activeJournalIcon} width={size} height={size}/> : <Image source={journalIcon} width={size} height={size}/>) }}/>
      <Tab.Screen name="Resource" component={Resource} options={{ headerShown: false, title: 'Resources',  tabBarIcon: (({focused, size}) => focused ? <Image source={activeResourceIcon} width={size} height={size}/> : <Image source={resourceIcon} width={size} height={size}/>) }}/>
    </Tab.Navigator>
);

function StackNavigator() {
    return (
      <Stack.Navigator initialRouteName='LandingScreen'>
        <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={headerOption} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={headerOption} />
        <Stack.Screen name="CheckEmailScreen" component={CheckEmailScreen} options={headerOption} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={headerOption} />
        <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={headerOption} />
        <Stack.Screen name="AgreeTermsPrivacyScreen" component={AgreeTermsPrivacyScreen} options={headerOption} />
        <Stack.Screen name="PricingScreen" component={PricingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={headerOption} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} options={headerOption} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={headerOption} />

        <Stack.Screen name="AssessmentTesting" component={NewAssessmentScreen} options={{headerShown: false }} />
        <Stack.Screen name="SurveyCompletionScreen" component={SurveyCompletionScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    );
}

function DrawerNavigator() {
    return (
      <Drawer.Navigator drawerContent={(props) => <DrawerComponent {...props} />} screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={StackNavigator}/>
      </Drawer.Navigator>
    );
}


export default function AppNavigator() {
    return (
        <NavigationContainer linking={linking}>
          <ToastProvider>
            <DrawerNavigator/>
          </ToastProvider>
        </NavigationContainer>
    );
}
