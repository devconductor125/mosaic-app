import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, connect, useSelector } from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { 
    SET_CATEGORIES,
    SET_USER_ROLE,
    LOG_OUT,
    SET_APP_LOGOUT_TIME,
    SET_ENABLED_MY_UPLOAD_FILES,
    SET_ENABLED_MY_JOURNAL,
    SET_JOURNAL_TEMPLATES,
    SET_DEFAULT_TEMPLATE_ID,
    SET_ENABLED_REWARDS,
    SET_LIFE_COACH_SESSIONS,
    SET_LAST_SESSION_ORDER,
    SET_WATCHED_LIFE_COACH_TUTORIAL,
    SET_OPENAI_STATUS_CHECK_TIME,
    SET_USER_FIRST_VISIT
} from '../../../redux/constants/actionTypes';

import AuthCheckComponent from '../../../components/AuthCheckComponent';
import { green100 } from '../../../utils/colors';


import Header from '../components/Header';
import YoutubeComponent from '../../../components/YoutubeComponent';

import { useGetAnalyticsQuery } from '../../users/slices/userApiSlice';
import WelcomeScreen from './WelcomeScreen';
import LandingHomeScreen from './LandingHomeScreen';



const DashboardScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    
    const firstVisit = useSelector(state => state.auth.firstVisit);

    const {
        user,
        appLogoutTime,
        openAiStatusCheckTime,
        isEnabledMyUploadFiles,
        isEnabledRewards,
        isWatchedLifeCoachTutorial
    } = useSelector(state => state.auth);
    const {
        categories,
        journalTemplates,
        defaultTemplateId
    } = useSelector(state => state.quiz);

    const {sessions, lastSessionOrder} = useSelector(state => state.session);
    
    const skipWelcome = async () => {
        await AsyncStorage.setItem('firstVisit', JSON.stringify({flag: false}));
        dispatch({type: SET_USER_FIRST_VISIT, payload: {flag: false}})
    }

    const {
        data: analytics,
        isLoading,
        error
    } = useGetAnalyticsQuery()

    useEffect(() => {
        if (analytics) {
            if (analytics.categories && analytics.categories !== categories) {
                dispatch({ type: SET_CATEGORIES, payload: analytics.categories })
            }
            if (analytics.user && user && (analytics.user.user_role_type !== user.user_role_type || analytics.user.is_daily_reminder_checked !== user.is_daily_reminder_checked)) {
                dispatch({ type: SET_USER_ROLE, payload: analytics.user })
            }

            if (analytics.app_logout_time && analytics.app_logout_time !== appLogoutTime) {
                // resetTimer();
                dispatch({ type: SET_APP_LOGOUT_TIME, payload: analytics.app_logout_time })
            }

            if (analytics.openai_status_check_time && analytics.openai_status_check_time !== openAiStatusCheckTime) {
                // resetTimer();
                dispatch({ type: SET_OPENAI_STATUS_CHECK_TIME, payload: analytics.openai_status_check_time })
            }

            if (analytics.is_enabled_my_upload_files !== null && analytics.is_enabled_my_upload_files !== isEnabledMyUploadFiles) {
                dispatch({ type: SET_ENABLED_MY_UPLOAD_FILES, payload: analytics.is_enabled_my_upload_files })
            }

            if (analytics.journal_templates !== null && analytics.journal_templates !== journalTemplates) {
                dispatch({ type: SET_JOURNAL_TEMPLATES, payload: analytics.journal_templates })
            }

            if (analytics.is_enabled_rewards !== null && analytics.is_enabled_rewards !== isEnabledRewards) {
                dispatch({ type: SET_ENABLED_REWARDS, payload: analytics.is_enabled_rewards })
            }

            if (analytics.default_template_id !== null && analytics.default_template_id !== defaultTemplateId) {
                dispatch({ type: SET_DEFAULT_TEMPLATE_ID, payload: analytics.default_template_id })
            }

            if (analytics.sessions && analytics.sessions !== sessions) {
                dispatch({ type: SET_LIFE_COACH_SESSIONS, payload: { sessions: analytics.sessions, goalCount: analytics.goal_count, lastSessionOrder: analytics.last_session_order, isActionPlanAccepted: analytics.is_action_plan_accepted } })
            }

            if (analytics.watched_life_coach_tutorial && analytics.watched_life_coach_tutorial !== isWatchedLifeCoachTutorial) {
                dispatch({ type: SET_WATCHED_LIFE_COACH_TUTORIAL, payload: analytics.watched_life_coach_tutorial })
            }
        }
    }, [analytics, appLogoutTime])

    return (
        firstVisit ? <WelcomeScreen navigation={navigation} skipWelcome = {skipWelcome}/> : <LandingHomeScreen navigation={navigation}/>
    )
}

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    
})

export default DashboardScreen;