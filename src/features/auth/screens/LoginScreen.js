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
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./../slices/authApiSlice";
import { useGetGoogleOAuthLoginUrlQuery, useGetFacebookAppQuery } from "./../slices/authSocialApiSlice";
import { SET_CREDENTIALS } from '../../../redux/constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from 'react-native-fbsdk-next';


import AuthCheckComponent from '../../../components/AuthCheckComponent';
import { error50, grayScale200, grayScale400, grayScale500, green400, green500, yellow100, yellow500 } from '../../../utils/colors';

const logoImg = require('./../../../assets/img/logo.png')
const showImg = require('./../../../assets/img/show.png')
const hideImg = require('./../../../assets/img/hide.png')
const googleIconImg = require('./../../../assets/img/google.png')
const facebookIconImg = require('./../../../assets/img/facebook.png')
const alertImg = require('./../../../assets/img/alert.png')


const LoginScreen = ({ navigation }) => {
    const emailRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errMsg, setErrMsg] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const [login, { isLoading }] = useLoginMutation()
    const { data: auth_url, isSuccess } = useGetGoogleOAuthLoginUrlQuery()
    const { data: appInfo, isAppSuccess } = useGetFacebookAppQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        emailRef.current.focus()
        loadStoredCredentials()
    }, [])

    useEffect(() => {
        if(appInfo && appInfo.appId){
            console.log("appInfo", appInfo)
            Settings.setAppID(appInfo.appId)

        }
    }, [isAppSuccess])
    const loadStoredCredentials = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('rememberMe');
    
          if (storedEmail) {
            setEmail(storedEmail);
            setRememberMe(true);
          }
        } catch (error) {
          console.error('Error loading stored credentials:', error);
        }
      };
    
      const saveCredentials = async () => {
        try {
          if (rememberMe) {
            await AsyncStorage.setItem('rememberMe', email);
          } else {
            await AsyncStorage.removeItem('rememberMe');
          }
        } catch (error) {
          console.error('Error saving credentials:', error);
        }
      };
    const handleEmailInput = (text) => setEmail(text.toLowerCase())

    const handlePasswordInput = (text) => setPassword(text)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = (isChecked) => {
        setRememberMe(isChecked);
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPasswordScreen')
    }

    const handleNavigateSignUp = () => {
        navigation.navigate('RegisterScreen')
    }

    const handleSubmit = async () => {
        if(email.trim() == ''){
            setErrMsg("Enter email")
            return
        }
        if(password.trim() == ''){
            setErrMsg("Enter password")
            return
        }
        try {

            console.log();
            setIsProcessing(true)
            const userData = await login({ email, password }).unwrap()   
            saveCredentials()
            setIsProcessing(false)
            dispatch({ type: SET_CREDENTIALS, payload: userData })
            setEmail('')
            setPassword('')
            navigation.navigate('MainTab')
        } catch (err) {
            console.log(err)
            setIsProcessing(false)
            if (!err?.status) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                if (err.data.user) {
                    navigation.navigate('VerificationScreen', { id: err.data.user.id, email: err.data.user.email } )
                } else {
                    setErrMsg('Incorrect User Email or Password');
                }
            } else if (err.status === 401) {
                setErrMsg('Incorrect User Email or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <AuthCheckComponent navigation={navigation} isPrivate={false} />
            <KeyboardAvoidingView styles={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.scrollView}>
                        <View style={styles.logoSection}>
                            <Image style={styles.logoImg} resizeMode="contain" source={logoImg} />
                        </View>
                        <View style={styles.inputSection}>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label} >
                                        E-mail
                                    </Text>
                                    <Text style={styles.asterisk}>*</Text>

                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        ref={emailRef}
                                        style={styles.input}
                                        placeholder="Enter E-mail"
                                        placeholderTextColor={grayScale200}
                                        value={email}
                                        inputMode='email'
                                        onChangeText={(text) => handleEmailInput(text)}
                                    />
                                    <TouchableOpacity style={styles.iconContainer}>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label}>
                                        Password
                                    </Text>
                                    <Text style={styles.asterisk}>*</Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor={grayScale200}
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={handlePasswordInput}
                                    />
                                    <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                                        <Image style={styles.eyeIcon} resizeMode="contain" source={showPassword ? hideImg : showImg} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={styles.rememberMeContainer}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    disabled={false}
                                    value={rememberMe}
                                    boxType={'square'}
                                    onCheckColor={'#000'}
                                    onTintColor={grayScale200}
                                    style={styles.checkbox}
                                    onValueChange={(newValue) => handleRememberMeChange(newValue)}
                                />
                                <TouchableOpacity onPress={() => handleRememberMeChange(!rememberMe)}>
                                    <Text style={styles.checkboxText}>
                                        Remember Me
                                    </Text>
                                </TouchableOpacity>


                            </View>
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.forgotPasswordText}>
                                    Forgot password?
                                </Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity disabled={isProcessing} style={[styles.getStartedBtn, isProcessing? {backgroundColor: yellow100}: {} ]} onPress={() => handleSubmit()}>
                                <Text style={styles.getStartedBtnText}>Sign in</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.orText}> or </Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.socialSection}>
                            <TouchableOpacity style={styles.googleSignBtn} onPress={() => handleGetStarted()}>
                                <Image style={styles.googleIcon} resizeMode="contain" source={googleIconImg} />
                                <Text style={styles.googleSignBtnText}>Sign in with Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.facebookSignBtn} onPress={() => handleGetStarted()}>
                                <Image style={styles.googleIcon} resizeMode="contain" source={facebookIconImg} />
                                <Text style={styles.googleSignBtnText}>Sign in with Facebook</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.bottomSection}>
                            <View style={styles.bottomGroup} >
                                <Text style={styles.bottomText}>Don't have an account</Text>
                                <TouchableOpacity onPress={handleNavigateSignUp}>
                                    <Text style={styles.signupLink}>
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
        backgroundColor: green500,
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
    logoSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg: {
        width: width * 0.45,
    },
    inputSection: { marginTop: '5%' },
    inputContainer: { marginTop: '3%' },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF'
    },
    asterisk: {
        color: yellow500,
        fontSize: 16
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
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    eyeIcon: {
        width: 20,
        height: 20
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        height: 20,
        width: 20,
    },
    checkboxText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '400',
        color: '#FFF',
        marginLeft: '5%'

    },
    forgotPasswordText: {
        color: yellow500,
        textDecorationLine: 'underline',
        fontSize: 14
    },
    buttonSection: {
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    getStartedBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    getStartedBtnText: {
        color: green500,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '5%',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: green400, // You can set the color of the divider
    },
    orText: {
        marginHorizontal: 10,
        color: '#FFF',
        fontSize: 18,
        textTransform: 'lowercase'
    },
    socialSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleSignBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFF',
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    googleIcon: {
        width: 20
    },
    googleSignBtnText: {
        color: grayScale500,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8
    },
    facebookSignBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFF',
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center',
        marginTop: 12
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
        fontSize: 18,
        fontWeight: '400',
        color: '#FFF'
    },
    signupLink: {
        fontSize: 18,
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

export default LoginScreen;