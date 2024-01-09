import React, {useState, useEffect} from 'react'
import {SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import AuthCheckComponent from '../../../components/AuthCheckComponent';
import Header from '../components/Header';
import AccessmentItem from '../components/AccessmentItem';
import ImageIcon from '../../../components/ImageIcon';
import { getAssIconName } from '../../../utils/common';
import ButtonComponent from '../../../components/ButtonComponent';

const demographicIcon  = require('../../../assets/img/icons/assessmet/demographic.png');
const environmentalIcon  = require('../../../assets/img/icons/assessmet/environmental.png');
const financialIcon  = require('../../../assets/img/icons/assessmet/financial.png');
const mentalIcon  = require('../../../assets/img/icons/assessmet/mental.png');
const physicalIcon  = require('../../../assets/img/icons/assessmet/physical.png');
const pulseIcon  = require('../../../assets/img/icons/assessmet/pulse.png');
const socialIcon  = require('../../../assets/img/icons/assessmet/social.png');
const spiritualIcon  = require('../../../assets/img/icons/assessmet/spiritual.png');

const AssessmentScreen = ({ navigation }) =>{
    
    const categories = useSelector(state => state.quiz?.categories);
    const {user} = useSelector(state => state.auth);
    const [completed, setCompleted] = useState(false);

    const iconsList = {
        'demographic': <ImageIcon source={demographicIcon} style={styles.assessIcon}/>,
        'environmental': <ImageIcon source={environmentalIcon} style={styles.assessIcon}/>,
        'financial': <ImageIcon source={financialIcon} style={styles.assessIcon}/>,
        'mental': <ImageIcon source={mentalIcon} style={styles.assessIcon}/>,
        'physical': <ImageIcon source={physicalIcon} style={styles.assessIcon}/>,
        'pulse': <ImageIcon source={pulseIcon} style={styles.assessIcon}/>,
        'social': <ImageIcon source={socialIcon} style={styles.assessIcon}/>,
        'spiritual': <ImageIcon source={spiritualIcon} style={styles.assessIcon}/>,
    }

    const createReport = () => {
    }

    useEffect(() => {
        const allCompleted = categories.every(assessment => assessment.completed === true);
        setCompleted(allCompleted);
    }, [categories])

    return (
        <SafeAreaView>
            <AuthCheckComponent navigation={navigation} isPrivate={true} />
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        {user?.user_role_type !== 'FREE' && categories?.map((item) => {
                            let assIcon = getAssIconName(item.name);
                            return item.is_free === false && (
                                <AccessmentItem key={item.id} name={item.name} completed={item.completed} categoryId={item.id} icon={iconsList[assIcon]}/>
                            )
                        })}
                        {categories && categories.map((item) => {
                            let assIcon = getAssIconName(item.name);
                            return item.is_free && (
                                <AccessmentItem key={item.id} name={item.name} completed={item.completed} categoryId={item.id} icon={iconsList[assIcon]}/>
                            )
                        })} 

                        {completed && <ButtonComponent
                            onPress={createReport}
                            text={'Generate Report'}
                            style={{marginTop: 30}}
                        />}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginBottom: 20
    },
    assessIcon: {
        width: 38,
        height: 38
    }, 
});

export default AssessmentScreen;