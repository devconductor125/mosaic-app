import React from 'react';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import PlanCard from '../components/PlanCard';

import { useGetStripeSettingsQuery, useCreateStripeSessionMutation } from '../slices/stripeApiSlice';
import { green100 } from '../../../utils/colors';


const PricingScreen = ({navigation}) => {
    const user = useSelector(state => state.auth.user)
    const [isProcessing, setIsProcessing] = useState(false)
    const {
        data: settings,
        isLoading
    } = useGetStripeSettingsQuery()

    const [createStripeSession, { isMutationLoading }] = useCreateStripeSessionMutation()

    if (isLoading || isMutationLoading) {
        return
        <View>
            <Text>Loading...</Text>
        </View>
    }
    const handlePurchase = async (setting) => {
        setIsProcessing(true)
        try{
            const session = await createStripeSession({price_id:setting.price_id, interval:setting.interval, success_url:'success?mode=pay', cancel_url:'pricing'}).unwrap()
            console.log('session',session)
            navigation.navigate('CheckoutScreen', {url: session.url})
            setIsProcessing(false)
        }catch(e){
            setIsProcessing(false)
            console.log(e)
        }

    }


    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.scrollView}>
                    {
                        settings ?
                            <>
                                {
                                    settings.map((setting, index) => (
                                        <PlanCard key={index} setting={setting} isProcessing={isProcessing} handlePurchase={handlePurchase} />
                                    ))

                                }
                            </>
                            : <></>
                    }

                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: green100
    },
    scrollView: {
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop: '10%',
        paddingBottom: '10%'
    }
})

export default PricingScreen;