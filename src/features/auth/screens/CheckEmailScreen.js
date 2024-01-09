import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { error50, grayScale400, green500, successNormal, yellow500 } from '../../../utils/colors';
import { useSendResetPasswordEmailMutation } from '../slices/authApiSlice';

const { width, height } = Dimensions.get('window');
const checkEmailImg = require('./../../../assets/img/check-email.png')


const CheckEmailScreen = ({ route, navigation }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [msg, setMsg] = useState('')

    const { id, email } = route.params;

    useEffect(() => {
        if (id && email) {
            console.log(email)
        } else {
            navigation.navigate("LoginScreen")
        }
    }, [id])

    const [sendResetPasswordEmail, { isLoading }] = useSendResetPasswordEmailMutation()

    const handleResend = () => {
        setIsProcessing(true)
        sendResetPasswordEmail({ user_id: id }).unwrap().then(function (res) {
            setMsg(res.message)
            setIsProcessing(false)
        })

    }

    const handleSignin = () => {
        navigation.navigate('LoginScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollView}>
                <View style={styles.topSection}>
                    <View style={styles.logoSection}>
                        <Image style={styles.checkEmailImg} resizeMode="contain" source={checkEmailImg} />
                    </View>
                    <View style={styles.contentTitleSection}>
                        <Text style={styles.contentTitle}>Check your mail</Text>
                        <Text style={styles.contentDescription}>We have sent a password recover link to your e-mail.</Text>
                    </View>
                </View>
                <View style={styles.buttonSection}>
                    <TouchableOpacity style={styles.continueBtn} onPress={() => handleSignin()}>
                        <Text style={styles.continueBtnText}>Ok</Text>
                    </TouchableOpacity>
                </View>
                {
                    msg &&
                    <View style={styles.successSection}><Text style={styles.successText}>{msg}</Text></View>
                }

                <View style={styles.bottomSection}>
                    <Text style={styles.bottomText}>Didn't receive the e-mail? Check your spam filter, or
                    </Text>
                    <TouchableOpacity onPress={() => handleResend()}>
                        <Text style={styles.yellowText} >
                            send link again
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>
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
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    logoSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    envelopeImg: {
        width: width * 0.6
    },
    scrollView: {
        flex: 1,
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03,
        paddingTop: '10%',
        paddingBottom: '10%'
    },
    contentTitleSection: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    contentTitle: {
        color: green500,
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: '10%'

    },
    checkEmailImg: {
        width: width * 0.6
    },
    contentDescription: {
        color: grayScale400,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        marginTop: '10%'
    },
    buttonSection: {
        flex: 1,
        width: '100%',
        justifyContent: 'center'
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

    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    bottomText: {
        color: grayScale400,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 14
    },
    yellowText: {
        color: yellow500,
        textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center'
    },
    successSection:{
        padding: '2%',
        marginTop: '3%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    successText: {
        color: successNormal,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400'
    },
    alertSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 10,
        backgroundColor: error50,
        paddingLeft: '2%',
        paddingRight: '8%',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
    alertImg: {

    },
    alertText: {
        color: grayScale400,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: '400',
        marginLeft: '-4%',
        marginRight: '2%',
        textAlign: 'center',
        justifyContent:'center',
        alignItems: 'center',
        width: '100%'
    },    
})

export default CheckEmailScreen;
