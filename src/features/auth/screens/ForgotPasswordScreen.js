import React, { useState, useEffect, useRef } from 'react';

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
import { error50, grayScale200, grayScale400, grayScale500, green500, yellow100, yellow500 } from '../../../utils/colors';
import { useSendResetPasswordEmailMutation, useCheckAccountByEmailMutation } from '../slices/authApiSlice';
const alertImg = require('./../../../assets/img/alert.png')

const ForgotPasswordScreen = ({ navigation }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const emailRef = useRef()

    const [checkAccountByEmail, { isLoading }] = useCheckAccountByEmailMutation()
    const [sendResetPasswordEmail, { isEmailLoading }] = useSendResetPasswordEmailMutation()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleSendLink = () =>{
        if (email == null || email.length < 3) {
            setErrMsg("Enter correct email!")
            return;
        }
        setIsProcessing(true)
        checkAccountByEmail({ email: email }).unwrap().then(function (res) {
            sendResetPasswordEmail({ user_id: res.user_id }).unwrap().then(function(emailRes){
                setIsProcessing(false)
                navigation.navigate("CheckEmailScreen", {id: res.user_id, email:email})
            }).catch(function(err){
                setEmail('')
                setIsProcessing(false)
                setErrMsg(err.data.message)    
            })
    
        }).catch(function (err) {
            setEmail('')
            setIsProcessing(false)
            setErrMsg(err.data.message)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView styles={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.scrollView}>
                        <View style={styles.forgotTextSection}>
                            <Text style={styles.forgotText}>Forgot your password?</Text>
                        </View>

                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionText}>Don't worry, we're here to help.</Text>
                            <Text style={styles.descriptionText}>Please enter your registered email address to receive a password reset link.</Text>
                        </View>
                        <View style={styles.inputSection}>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label} >
                                        E-mail
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        ref={emailRef}
                                        style={styles.input}
                                        placeholder="Enter E-mail"
                                        placeholderTextColor={grayScale200}
                                        value={email}
                                        inputMode='email'
                                        onChangeText={(text) => setEmail(text.toLowerCase())}
                                    />
                                </View>
                            </View>
                        </View>
                        {
                            errMsg &&
                            <View style={styles.alertSection}>
                                <Image style={styles.alertImg} resizeMode="contain" source={alertImg} />
                                <Text style={styles.alertText}>
                                    {errMsg}
                                </Text>
                            </View>

                        }
                        <View style={styles.buttonSection}>
                            <TouchableOpacity disabled={isProcessing} style={[styles.sendBtn, isProcessing? {backgroundColor: yellow100}: {} ]} onPress={() => handleSendLink()}>
                                <Text style={styles.sendBtnText}>Send reset link</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

            </KeyboardAvoidingView>



        </SafeAreaView>
    )

}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FBFD',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400'
    },
    keyboardAvoidingView: {
        flex: 1
    },
    scrollView: {
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03,
        paddingTop: '10%',
        paddingBottom: '10%'
    },
    forgotTextSection: {
        paddingTop: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontWeight: '700',
        color: green500
    },
    descriptionSection: {
        marginTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        color: grayScale400,
        textAlign: 'center'
    },    
    inputSection: { marginTop: '10%' },
    inputContainer: { marginTop: '5%' },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600',
        color: grayScale500
    },
    inputGroup: {
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#FFF'
    },
    input: {
        flex: 1,
        height: 25,
    },
    buttonSection: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    sendBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },
    bottomSection: {
        textAlign: 'right',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: grayScale500
    },
    signinLink: {
        fontSize: 14,
        fontWeight: '400',
        color: yellow500,
        textDecorationLine: 'underline',
        marginLeft: 9
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
        marginLeft: '2%',
        marginRight: '2%',
        textAlign: 'left'
    },
})

export default ForgotPasswordScreen;