import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, connect, useSelector } from "react-redux"
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import AuthCheckComponent from '../../../components/AuthCheckComponent';
import { useLogoutMutation } from '../../auth/slices/authApiSlice';


import Header from '../components/Header';
import YoutubeComponent from '../../../components/YoutubeComponent';

import { useGetAnalyticsQuery } from '../../users/slices/userApiSlice';


const WelcomeScreen = ({ navigation, skipWelcome }) => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const {
        user,
        appLogoutTime,
        openAiStatusCheckTime,
        isEnabledMyUploadFiles,
        isEnabledRewards,
        isWatchedLifeCoachTutorial
    } = useSelector(state => state.auth);

    const goToAssessment = () => {
        navigation.navigate('AssessmentScreen')
        skipWelcome();
    }

    return (
        <SafeAreaView style={styles.container}>
            <AuthCheckComponent navigation={navigation} isPrivate={true} />
            <Header userInfo = {user}/>
            <ScrollView>
                <View style={styles.videoSection}>
                    <YoutubeComponent
                        height={222}
                        // videoId = "my-assessments-video"
                        videoId = 'welcome-video'
                    />
                </View>
                <View style={styles.greetingSection}>
                    <View style={styles.greetingTitle}>
                        <Text style={styles.titleContent}>Welcome to your</Text>
                        <Text style={styles.titleContent}>Self-Assessments!</Text>
                    </View>
                    <View style={styles.greetingContents}>
                        <Text style={styles.greetingContent}>You have embarked on a journey of self-discovery and personal growth. Mosaic Life empowers you to delve deeper into your own experiences and unlock the true potential of a balanced, holistic life. {'\n'}{'\n'} We'll start by completing a series of assessments to gather some important information about you that will be used to customize your action plan and next steps.</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={goToAssessment}>
                        <View style={styles.accessmentBtn}>
                            <Text style={styles.accBtnText}>Start taking assessments</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '400',
    },
    scrollView: {
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop: '10%',
        paddingBottom: '10%'
    },
    videoSection: {
        marginTop: 30,
        height: 222,
        marginHorizontal: 16,
        backgroundColor: '#e2e2e2',
        borderRadius: 15
    },
    greetingSection: {
        width: '100%',
        marginTop: 34,
        paddingHorizontal: 16,
    },
    titleContent: {
        textAlign: 'center',
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontWeight: '500',
        color: '#1d4348'
    },
    greetingContents: {
        marginTop: 38,
    },
    greetingContent: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#3B4547'
    },
    buttonContainer: {
        marginBottom: 30,
    },
    accessmentBtn: {
        backgroundColor: '#D7A03E',
        marginHorizontal: 16,
        marginTop: 40,
        paddingVertical: 16,
        borderRadius: 10
    },
    accBtnText: {
        textAlign: 'center',
        fontFamily: 'Gotham Rounded',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
})

export default WelcomeScreen;