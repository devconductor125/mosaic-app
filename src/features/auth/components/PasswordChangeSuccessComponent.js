import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { grayScale400, green500, yellow500 } from '../../../utils/colors';

const { width, height } = Dimensions.get('window');
const padlockImg = require('./../../../assets/img/padlock.png')

const PasswordChangeSuccessComponent = ({ navigation }) => {
    const handleSignin = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <View style={styles.content}>
            <Image style={styles.emailImg} resizeMode="contain" source={padlockImg} />
            <View style={styles.contentTitleSection}>
                <Text style={styles.contentTitle}>Password changed successfully!</Text>
                <Text style={styles.contentDescription}>Please login to your account again</Text>
            </View>

            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.signinBtn} onPress={() => handleSignin()}>
                    <Text style={styles.signinBtnText}>Sign in now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    content: {
        width: width * 0.95,
        backgroundColor: 'white',
        padding: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
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
    buttonSection: {
        marginTop: '10%',
        marginBottom: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: width * 0.75,
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    signinBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },    
});

export default PasswordChangeSuccessComponent;
