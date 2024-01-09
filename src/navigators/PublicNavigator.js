import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import LandingScreen from '../features/landing/screens/LandingScreen';
import VerificationScreen from '../features/auth/screens/VerificationScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import CheckEmailScreen from '../features/auth/screens/CheckEmailScreen';
import NewPasswordScreen from '../features/auth/screens/NewPasswordScreen';

const Stack = createStackNavigator();

const PublicNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName='LandingScreen'>
            <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CheckEmailScreen" component={CheckEmailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

export default PublicNavigator;