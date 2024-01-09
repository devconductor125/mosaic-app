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

import { 
    SET_USER_FIRST_VISIT
} from '../../../redux/constants/actionTypes';

import AuthCheckComponent from '../../../components/AuthCheckComponent';
import { useLogoutMutation } from '../../auth/slices/authApiSlice';
import Header from '../components/Header';
import OverviewComponent from '../components/OverviewComponent';
import AssessmentTaken from '../components/AssessmentTaken';
import PerformanceComponent from '../components/PerformanceComponent';
import ResourcesComponent from '../components/ResourcesComponent';


const LandingHomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const categories = useSelector(state => state.quiz?.categories);
    const [assesments, setAssessments] = useState(7);
    const [passedAssess, setPassedAssess] = useState(3);

    useEffect(() => {
        if(categories) {
            setAssessments(categories.length);
            const passeds = categories.filter(item => item.completed == true).length;
            setPassedAssess(passeds)
        }
    }, [categories])

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
        // dispatch({type: SET_USER_FIRST_VISIT, payload: {flag: true}})
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <AuthCheckComponent navigation={navigation} isPrivate={true} />
            <Header userInfo = {user}/>
            <ScrollView>
                <OverviewComponent badge={'Starter'} point={1450}/>
                <AssessmentTaken assNum={assesments} takenNum={passedAssess}/>
                <PerformanceComponent/>
                <ResourcesComponent />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={goToAssessment}>
                        <View style={styles.accessmentBtn}>
                            <Text style={styles.accBtnText}>Coach Suggestions</Text>
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
    },
    
})

export default LandingHomeScreen;