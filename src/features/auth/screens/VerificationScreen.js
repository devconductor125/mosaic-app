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

import Modal from "react-native-modal";
import { error50, grayScale200, grayScale400, grayScale500, green100, green200, green500, successNormal, yellow100, yellow500 } from '../../../utils/colors';
import VerificationSuccessComponent from '../components/VerificationSuccessComponent';
import { useDispatch } from "react-redux";
import { useSendVerificationEmailMutation, useActivateEmailMutation } from '../slices/authApiSlice';
import { SET_CREDENTIALS } from '../../../redux/constants/actionTypes';

const { width, height } = Dimensions.get('window');

const alertImg = require('./../../../assets/img/alert.png')

const VerificationScreen = ({ route, navigation }) => {
    const { id, email } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [userData, setUserData] = useState(null)
    const [msg, setMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [inputValues, setInputValues] = useState({
        code1: '',
        code2: '',
        code3: '',
        code4: '',
    });

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if(inputRef1.current){
            inputRef1.current.focus()
        }
    }, [])

    useEffect(() => {
        if (id && email) {
            console.log(email)
        } else {
            navigation.navigate("LoginScreen")
        }
    }, [email])

    useEffect(() => {
        const code = inputValues.code1 + inputValues.code2 + inputValues.code3 + inputValues.code4;
        if(code.length >= 4){
            setErrMsg('')
            setIsProcessing(false)
        }else{
            setIsProcessing(true)
        }
    }, [inputValues])

    const [sendVerificationEmail, { isLoading }] = useSendVerificationEmailMutation()
    const [activateEmail] = useActivateEmailMutation()

    const handleResend = () => {
        setIsProcessing(true)
        sendVerificationEmail({ user_id: id }).unwrap().then(function (res) {
            setMsg(res.message)
            setErrMsg('')
            setIsProcessing(false)
            setInputValues({
                code1: '',
                code2: '',
                code3: '',
                code4: '',
            });            
        }).catch(function(err){
            setIsProcessing(false)
            console.log(err)
            setErrMsg(err.data.message)
            setMsg('')  
        })
    }


    const handleVerify = () =>{
        const code = inputValues.code1 + inputValues.code2 + inputValues.code3 + inputValues.code4;
        console.log("code", code)
        if(isNaN(code) || code.length < 4){
            setErrMsg("Enter all verification codes correctly.")
        }else{
            setErrMsg("")
        }

        setIsProcessing(true)
        activateEmail({user_id: id, code: code}).unwrap().then(function(res){
            setIsProcessing(false)
            setUserData(res)
            setModalVisible(true)
        }).catch(function(err){
            setIsProcessing(false)
            console.log(err)
            setErrMsg(err.data.message)
            setMsg('')
            
        })

    }

    const numberChangeHandler = (text, num) => {
        const numericValue = text.replace(/\D/g, '');
        if (num == 1) {
            setInputValues({ ...inputValues, code1: numericValue })
            if (numericValue.length > 0 && inputRef2.current) {
                inputRef2.current.focus()
            }
        } else if (num == 2) {
            setInputValues({ ...inputValues, code2: numericValue })
            if (numericValue.length > 0 && inputRef3.current) {
                inputRef3.current.focus()
            }
        } else if (num == 3) {
            setInputValues({ ...inputValues, code3: numericValue })
            if (numericValue.length > 0 && inputRef4.current) {
                inputRef4.current.focus()
            }
        } else if (num == 4) {
            setInputValues({ ...inputValues, code4: numericValue })
        }
    }

    const handleGoNext = () =>{
        dispatch({ type: SET_CREDENTIALS, payload: userData })
        navigation.navigate('AgreeTermsPrivacyScreen')
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView styles={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.scrollView}>
                        <View style={styles.topTextSection}>
                            <Text style={styles.topText}>One final step!</Text>
                            <Text style={styles.topText}>We need to verify your mail</Text>
                        </View>
                        <View style={styles.descriptionSection}>
                            <Text style={styles.descriptionText}>Please check your inbox for a 4-digit verification code sent to <Text style={styles.emailText}>johndoe@xyzcompany.com</Text></Text>
                        </View>

                        <View style={styles.inputSection}>
                            <View style={styles.inputGroup}>
                                <TextInput ref={inputRef1} keyboardType='numeric' value={inputValues.code1} style={styles.input} maxLength={1} onChangeText={(text) => numberChangeHandler(text, 1)} />
                                <TextInput ref={inputRef2} keyboardType='numeric' value={inputValues.code2} style={styles.input} maxLength={1} onChangeText={(text) => numberChangeHandler(text, 2)} />
                                <TextInput ref={inputRef3} keyboardType='numeric' value={inputValues.code3} style={styles.input} maxLength={1} onChangeText={(text) => numberChangeHandler(text, 3)} />
                                <TextInput ref={inputRef4} keyboardType='numeric' value={inputValues.code4} style={styles.input} maxLength={1} onChangeText={(text) => numberChangeHandler(text, 4)} />
                            </View>
                        </View>

                        <View style={styles.resendSection}>
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={styles.resendText}>Resend code</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            msg && 
                            <View style={styles.successSection}><Text style={styles.successText}>{msg}</Text></View>
                        }

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
                            <TouchableOpacity disabled={isProcessing} style={[styles.verifyBtn, isProcessing? {backgroundColor: yellow100}: {} ]} onPress={() => handleVerify()}>
                                <Text style={styles.verifyBtnText}>Verify</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomSection}>
                            <Text style={styles.bottomText}>Can’t find it? Please check your spam folder</Text>
                        </View>


                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                isVisible={isModalVisible}
                deviceWidth={width}
                deviceHeight={height}
                coverScreen={false}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={styles.modal}
            >
                <VerificationSuccessComponent handleGoNext={handleGoNext} />
            </Modal>

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
    keyboardAvoidingView: {
        flex: 1
    },
    scrollView: {
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03,
        paddingTop: '10%',
        paddingBottom: '10%'
    },
    topTextSection: {
        paddingTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 24,
        fontWeight: '700',
        marginTop: '2%',
        color: green500
    },
    descriptionSection: {
        marginTop: '10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    descriptionText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        color: grayScale400,
        textAlign: 'center'
    },
    emailText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: grayScale400,
        fontWeight: '600',
    },
    inputSection: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: width * 0.19,
        width: width * 0.19,
        backgroundColor: '#FFF',
        marginHorizontal: '2%',
        borderColor: green100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 40,
        fontFamily: 'Roboto',
        fontWeight: '500',
        textAlign: 'center'
    },
    resendSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8%'

    },
    resendText: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
        color: yellow500
    },
    buttonSection: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    verifyBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    verifyBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },
    bottomSection: {
        textAlign: 'center',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: grayScale500
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    successSection:{
        padding: '2%',
        marginTop: '5%'

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

export default VerificationScreen;