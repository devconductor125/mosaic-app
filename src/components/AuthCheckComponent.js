import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthCheckComponent = ({ navigation, isPrivate }) => {
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        if (!auth) {
            return
        }
        if (isPrivate) {
            console.log('private auth1', auth)
            if (auth.user == null || auth.token == null) {
                navigation.navigate('LandingScreen');
            } else if (auth.user.is_email_verified == false) {
                navigation.navigate('VerificationScreen');
            } else if (auth.user.is_first_login == true) {
                // User is logged in, navigate to the dashboard
                navigation.navigate('AgreeTermsPrivacyScreen');
            } else if (auth.user.user_role_type == 'FREE') {
                navigation.navigate('PricingScreen');
            }
        } else {
            console.log("auth2", auth)
            if (auth.user && auth.token) {
                if (auth.user.is_email_verified == false) {
                    navigation.navigate('VerificationScreen');
                } else if (auth.user.is_first_login == true) {
                    // User is logged in, navigate to the dashboard
                    navigation.navigate('AgreeTermsPrivacyScreen');
                } else if (auth.user.user_role_type == 'FREE') {
                    navigation.navigate('PricingScreen');
                }else{
                    navigation.navigate('MainTab');
                }
            }
        }
    }, [auth, isPrivate, navigation]);
    if (!auth) {
        return null;
    }

    return (
        <></>
    )

}

export default AuthCheckComponent;