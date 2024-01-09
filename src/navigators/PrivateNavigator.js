import { createStackNavigator } from '@react-navigation/stack';
import AssessmentScreen from '../features/assessments/screens/AssessmentScreen';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import AgreeTermsPrivacyScreen from '../features/termsprivacy/screens/AgreeTermsPrivacyScreen';
import PricingScreen from '../features/stripe/screens/PricingScreen';

const Stack = createStackNavigator();

const PrivateNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='DashboardScreen'>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgreeTermsPrivacyScreen" component={AgreeTermsPrivacyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PricingScreen" component={PricingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AssessmentScreen" component={AssessmentScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default PrivateNavigator;