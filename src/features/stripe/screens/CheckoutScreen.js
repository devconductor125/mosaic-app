import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useLazyGetCurrentUserQuery } from '../../users/slices/userApiSlice';
import { useDispatch } from "react-redux";
import { SET_USER_ROLE } from '../../../redux/constants/actionTypes';

const CheckoutScreen = ({navigation, route }) => {
    const { url } = route.params
    const [webViewUrl, setWebViewUrl] = useState(url);
    const [getCurrentUser] = useLazyGetCurrentUserQuery()
    const dispatch = useDispatch()

    const handleNavigationStateChange = (navState) => {

        console.log("navState.url",navState.url)
        // Check if the WebView URL contains the cancel URL or any undesired URL
        if (navState.url.includes('/pricing')) {
            // Handle the cancel action (prevent it or take appropriate action)
            // For example, you might want to redirect to a different page
            setWebViewUrl('https://mosaiclife.ai');
            navigation.navigate('PricingScreen')
        }else if(navState.url.includes('/success')){
            setWebViewUrl('https://mosaiclife.ai');
            setTimeout(() => {
                getCurrentUser().unwrap().then(function(currentUser){
                    dispatch({ type: SET_USER_ROLE, payload: currentUser })
                    navigation.navigate('MainTab')
                })
            }, 3000);

        }
    };
    return (
        <WebView
            source={{ uri: webViewUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            onLoad={() => console.log('WebView content has loaded')}

            onNavigationStateChange={handleNavigationStateChange}
        />
    );
};

export default CheckoutScreen;