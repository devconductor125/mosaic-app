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
import { error50, grayScale200, grayScale400, grayScale500, green500, successNormal, yellow500 } from '../../../utils/colors';
import PasswordChangeSuccessComponent from '../components/PasswordChangeSuccessComponent';
import { useCheckResetLinkMutation, useResetPasswordMutation } from '../slices/authApiSlice';
import getPasswordMessage from '../../../utils/common';

const showImg = require('./../../../assets/img/show.png')
const hideImg = require('./../../../assets/img/hide.png')
const alertImg = require('./../../../assets/img/alert.png')


const NewPasswordScreen = ({ route, navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [newUidb64, setNewUidb64] = useState(null);
    const [newToken, setNewToken] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const { uidb64, token } = route.params;

    const [checkResetLink, { isLoading }] = useCheckResetLinkMutation()
    const [resetPassword] = useResetPasswordMutation()

    useEffect(() => {
        if (uidb64 && token) {
            console.log(uidb64)
            checkResetLink({ uidb64, token }).unwrap().then(function (res) {
                setNewUidb64(res.uid)
                setNewToken(res.token)
            }).catch(function (err) {
                setErrMsg(err.data.message)
            })
        } else {
            navigation.navigate("LoginScreen")
        }
    }, [uidb64])

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
    
    const handleResetPassword = () => {
        if (getPasswordMessage(password) !== '' || getConfirmationMessage() !== '') {
            return;
        }
        setIsProcessing(true)
        resetPassword({ uidb64: newUidb64, token: newToken, password: password }).unwrap().then(function (res) {
            setIsProcessing(false)
            setModalVisible(true)
        }).catch(function (err) {
            setPassword('')
            setConfirmPassword('')
            setIsProcessing(false)
            setErrMsg(err.data.message)
        })

    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView styles={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.scrollView}>
                        <View style={styles.topSection}>
                            <Text style={styles.topTitleText}>Create new password</Text>
                            <Text style={styles.topDescriptionText}>Your new password must be different from previous used passwords</Text>
                        </View>

                        <View style={styles.inputSection}>
                            <View style={styles.inputContainer}>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.label}>
                                        Password
                                    </Text>
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
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
                                </View>
                                <View style={styles.inputGroup}>
                                    <TextInput
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
                            </View>
                            {renderPasswordConfirmationRequirements()}

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
                            <TouchableOpacity style={styles.resetBtn} onPress={() => handleResetPassword()}>
                                <Text style={styles.resetBtnText}>Reset Password</Text>
                            </TouchableOpacity>
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
                <PasswordChangeSuccessComponent navigation={navigation} />
            </Modal>


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
    topSection: {
        paddingTop: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topTitleText: {
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontWeight: '700',
        color: green500
    },
    topDescriptionText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
        color: grayScale400,
        marginTop: '5%'
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
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    eyeIcon: {
        width: 20,
        height: 20
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
    buttonSection: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resetBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    resetBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default NewPasswordScreen;