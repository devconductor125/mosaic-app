import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { grayScale400, grayScale500, green100, green500, yellow100, yellow500 } from '../../../utils/colors';
import { useSelector, useDispatch } from 'react-redux';
import { useAcceptTermsMutation } from '../../users/slices/userApiSlice';
import { ACCEPT_TERMS } from '../../../redux/constants/actionTypes';

const { width, height } = Dimensions.get('window');
const envelopeImg = require('./../../../assets/img/envelope.png')


const AgreeTermsPrivacyScreen = ({ navigation }) => {
    const [isAccepted, setIsAccepted] = useState(false)
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        if (auth.user.is_first_login == false) {
            // User is logged in, navigate to the dashboard
            navigation.navigate('MainTab');
        }
    }, []);

    const [acceptTerms, { isLoading }] = useAcceptTermsMutation()

    if (isLoading) {
        return <View><Text>loading...</Text></View>
    }


    const handleContinue = async () => {
        try {
            const userData = await acceptTerms().unwrap()
            dispatch({ type: ACCEPT_TERMS })
            navigation.navigate('PricingScreen')

        } catch (err) {
            console.log(err)
        }

    };
    const handleOpenPrivacy = () => {
        navigation.navigate('PrivacyScreen')

    }
    const handleOpenTerms = () => {
        navigation.navigate('TermsScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.scrollView}>
                    <View style={styles.topSection}>
                        <View style={styles.logoSection}>
                            <Image style={styles.envelopeImg} resizeMode="contain" source={envelopeImg} />
                        </View>
                        <View style={styles.contentTitleSection}>
                            <Text style={styles.contentTitle}>Privacy Notice</Text>
                            <Text style={styles.contentDescription}>We value your privacy and are committed to ensuring the security of your personal information. This Privacy Notice outlines how we collect, use, and protect your data when you use our app.</Text>
                            <Text style={styles.contentDetail}>For a more detailed description of how we process and protect your personal information, please read our&nbsp;
                                <Text style={styles.yellowText} onPress={handleOpenTerms}>
                                    Terms&Conditions
                                </Text>
                                &nbsp;and&nbsp;
                                <Text style={styles.yellowText} onPress={handleOpenPrivacy}>
                                    Privacy Policy
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.checkboxSection}>
                            <CheckBox
                                disabled={false}
                                value={isAccepted}
                                boxType={'square'}
                                onCheckColor={grayScale400}
                                onTintColor={green100}
                                onValueChange={(newValue) => setIsAccepted(newValue)}
                            />
                            <TouchableOpacity onPress={() => setIsAccepted(!isAccepted)}>
                                <Text style={styles.checkboxText}>
                                    By checking this box and clicking Continue, I accept&nbsp;
                                    <Text style={styles.yellowText} onPress={handleOpenTerms}>
                                        Terms&Conditions
                                    </Text>
                                    &nbsp;and&nbsp;
                                    <Text style={styles.yellowText} onPress={handleOpenPrivacy}>
                                        Privacy Policy
                                    </Text>

                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.buttonSection}>
                            <TouchableOpacity disabled={!isAccepted} style={[styles.continueBtn, isAccepted == false ? { backgroundColor: yellow100 } : {}]} onPress={() => handleContinue()}>
                                <Text style={styles.continueBtnText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFD',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400'
    },
    topSection: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    logoSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    envelopeImg: {
        width: width * 0.6
    },
    scrollView: {
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03,
        paddingTop: '10%',
        paddingBottom: '10%'
    },
    contentTitleSection: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    contentTitle: {
        color: green500,
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center'

    },
    emailImg: {
        width: width * 0.6
    },
    contentDescription: {
        marginTop: '10%',
        color: grayScale400,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16
    },
    contentDetail: {
        marginTop: '5%',
        color: grayScale400,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16
    },
    checkboxSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '20%'
    },
    checkboxText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        color: grayScale400,
        marginLeft: '2%'
    },
    yellowText: {
        color: yellow500,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: '400',
    },
    buttonSection: {
        marginTop: '10%',
        marginBottom: '10%',
        width: '100%'
    },
    continueBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    continueBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },

})

export default AgreeTermsPrivacyScreen;
