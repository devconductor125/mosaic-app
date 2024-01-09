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
import AuthCheckComponent from '../../../components/AuthCheckComponent';
import { useRegisterMutation } from '../slices/authApiSlice';
import { useGetGoogleOAuthRegisterUrlQuery, useGetFacebookAppQuery } from '../slices/authSocialApiSlice';
import getPasswordMessage from '../../../utils/common';
import { error50, error500, grayScale200, grayScale400, grayScale500, green500, successLightActive, successLightHover, successNormal, yellow100, yellow50, yellow500 } from '../../../utils/colors';

const showImg = require('./../../../assets/img/show.png')
const hideImg = require('./../../../assets/img/hide.png')
const alertImg = require('./../../../assets/img/alert.png')

const RegisterScreen = ({ navigation }) => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const errRef = useRef()
    const [isProcessing, setIsProcessing] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [firstNameErr, setFirstNameErr] = useState(false)
    const [lastName, setLastName] = useState('')
    const [lastNameErr, setlastNameErr] = useState(false)
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const [register] = useRegisterMutation()
    const { data: auth_url } = useGetGoogleOAuthRegisterUrlQuery()
    const { data: appInfo } = useGetFacebookAppQuery()
    console.log('auth_url', auth_url)

    useEffect(() => {
        firstNameRef.current.focus()
    }, [])

    useEffect(() => {
        if (firstName != '') {
            setFirstNameErr(false)
        }
        if (lastName != '') {
            setlastNameErr(false)
        }
        if (email != '') {
            setEmailErr(false)
        }
        if (password != '') {
            setPasswordErr(false)
        }
        if (confirmPassword != '') {
            setConfirmPasswordErr(false)
        }
        if(firstName && lastName && email && password && confirmPassword){
            setErrMsg('')
        }
    }, [firstName, lastName, email, password, confirmPassword])


    const getConfirmationMessage = () => {
        var message = ''
        if (confirmPassword !== '' && password != confirmPassword) {
            message = 'Password confirmation doesn\'t match!'
        }
        return message;
    }

    const renderPasswordRequirements = () => {
        var message = getPasswordMessage(password)

        if (message == '') {
            return <View><Text style={styles.successText}>Password meets the requirements</Text></View>;
        } else {
            return (
                <View style={styles.alertSection}>
                    <Image style={styles.alertImg} resizeMode="contain" source={alertImg} />
                    <Text style={styles.alertText}>
                        {message}
                    </Text>
                </View>
            )
        }
    };

    const renderPasswordConfirmationRequirements = () => {
        var message = getConfirmationMessage()

        if (message !== '') {
            return (
                <View style={styles.alertSection}>
                    <Image style={styles.alertImg} resizeMode="contain" source={alertImg} />
                    <Text style={styles.alertText}>
                        {message}
                    </Text>
                </View>
            )
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleNavigateSignIn = () => {
        navigation.navigate('LoginScreen')
    }

    const isValidEmail = (email) => {
        // Regular expression for a simple email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    const handleSignup = async () => {
        let flag = false
        if (firstName.trim() == '') {
            firstNameRef.current.focus()
            setFirstNameErr(true)
            flag = true
        }
        if (lastName.trim() == '') {
            if (flag == false) {
                lastNameRef.current.focus()
            }
            setlastNameErr(true)
            flag = true
        }
        if (email.trim() == '' || isValidEmail(email) == false) {
            if (flag == false) {
                emailRef.current.focus()
            }
            setEmailErr(true)
            flag = true
        }
        if (getPasswordMessage(password) !== '') {
            if (flag == false) {
                passwordRef.current.focus()
            }
            setPasswordErr(true)
            flag = true
        }
        if (getConfirmationMessage() !== '') {
            if (flag == false) {
                confirmPasswordRef.current.focus()
            }
            setConfirmPasswordErr(true)
            flag = true
        }
        if (flag) {
            return
        }

        try {
            setIsProcessing(true)
            const userData = await register({ first_name: firstName, last_name: lastName, email: email, password: password }).unwrap()
            setIsProcessing(false)
            navigation.navigate('VerificationScreen', { id: userData.id, email: userData.email });

            // dispatch({ type: SET_CREDENTIALS, payload: userData })
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            // navigate('/accept-terms')
        } catch (err) {
            setIsProcessing(false)
            console.log(err)
            if (!err?.status) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                const errorData = err.data;
                const keys = Object.keys(errorData);
                console.log('keys', keys)
                if (keys.includes('email')) {
                    setErrMsg('It looks like this email is already associated with a Mosaic Life App account.')
                    return;
                }
                let errorStr = "";
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    errorStr += key + " : " + errorData[key] + "\n";
                }
                setErrMsg(errorStr);
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <AuthCheckComponent navigation={navigation} isPrivate={false} />
            <KeyboardAvoidingView styles={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.scrollView}>
                        <View style={styles.signupTextSection}>
                            <Text style={styles.signupText}>Sign up</Text>

                        </View>

                        <View style={styles.inputSection}>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label} >
                                        First Name
                                    </Text>
                                    <Text style={styles.asterisk}>*</Text>

                                </View>
                                <View style={[styles.inputGroup, firstNameErr ? { borderColor: error500 } : {}]}>
                                    <TextInput
                                        ref={firstNameRef}
                                        style={styles.input}
                                        placeholder="Your First Name"
                                        placeholderTextColor={grayScale200}
                                        value={firstName}
                                        onChangeText={(text) => setFirstName(text)}
                                    />
                                    <TouchableOpacity style={styles.iconContainer}>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label} >
                                        Last Name
                                    </Text>
                                    <Text style={styles.asterisk}>*</Text>

                                </View>
                                <View style={[styles.inputGroup, lastNameErr ? { borderColor: error500 } : {}]}>
                                    <TextInput
                                        ref={lastNameRef}
                                        style={styles.input}
                                        placeholder="Your Last Name"
                                        placeholderTextColor={grayScale200}
                                        value={lastName}
                                        onChangeText={(text) => setLastName(text)}
                                    />
                                    <TouchableOpacity style={styles.iconContainer}>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label} >
                                        E-mail
                                    </Text>
                                    <Text style={styles.asterisk}>*</Text>

                                </View>
                                <View style={[styles.inputGroup, emailErr ? { borderColor: error500 } : {}]}>
                                    <TextInput
                                        ref={emailRef}
                                        style={styles.input}
                                        placeholder="Enter E-mail"
                                        placeholderTextColor={grayScale200}
                                        value={email}
                                        inputMode='email'
                                        onChangeText={(text) => setEmail(text.toLowerCase())}
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
                                <View style={[styles.inputGroup, passwordErr ? { borderColor: error500 } : {}]}>
                                    <TextInput
                                        ref={passwordRef}
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor={grayScale200}
                                        secureTextEntry={!showPassword}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                    <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                                        <Image style={styles.eyeIcon} resizeMode="contain" source={showPassword ? hideImg : showImg} />
                                    </TouchableOpacity>
                                </View>
                                {renderPasswordRequirements()}


                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label}>
                                        Confirm Password
                                    </Text>
                                    <Text style={styles.asterisk}>*</Text>
                                </View>
                                <View style={[styles.inputGroup, confirmPasswordErr ? { borderColor: error500 } : {}]}>
                                    <TextInput
                                        ref={confirmPasswordRef}
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor={grayScale200}
                                        secureTextEntry={!showPassword}
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                    />
                                    <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                                        <Image style={styles.eyeIcon} resizeMode="contain" source={showPassword ? hideImg : showImg} />
                                    </TouchableOpacity>
                                </View>

                                {renderPasswordConfirmationRequirements()}

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
                            <TouchableOpacity disabled={isProcessing} style={[styles.getStartedBtn, isProcessing? {backgroundColor: yellow100}: {} ]} onPress={() => handleSignup()}>
                                <Text style={styles.getStartedBtnText}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomSection}>
                            <View style={styles.bottomGroup} >
                                <Text style={styles.bottomText}>Already have an account</Text>
                                <TouchableOpacity onPress={handleNavigateSignIn}>
                                    <Text style={styles.signinLink}>
                                        Sign in
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
    signupTextSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontWeight: '700',
        color: green500
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
        color: grayScale500
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
        marginLeft: '2%',
        marginRight: '2%',
        textAlign: 'left'
    },
})

export default RegisterScreen;