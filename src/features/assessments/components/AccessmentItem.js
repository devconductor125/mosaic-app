import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useGetCategoryQuery, useSaveResultMutation } from '../slices/quizApiSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default AccessmentItem = props => {
    const [questions, setQuestions] = useState(0);
    const navigation = useNavigation();

    const {
        data: category,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoryQuery(props.categoryId)

    useEffect(() => {
        if(category?.quiz_forms.length > 0){
            const questions = JSON.parse(category.quiz_forms[0]?.survey_form_json);
            const realQuestions = questions.pages.filter(a => a.elements?.length > 0);
            setQuestions(realQuestions.length)
        }
    }, [category]);

    const handleRetake = () => {
        navigation.navigate('AssessmentTesting', {catId: props.categoryId, totalQuiz: questions});
    }

    return <View style={styles.container}>
        <View style={[styles.takable, props.completed ? styles.subWidth : styles.fullWidth]}>
            <View style={[styles.takableLeft, props.completed ? styles.leftSubWidth : styles.leftFullWidth]}>
                <View>
                    {props.icon}
                </View>
                <View style={styles.assessDetail}>
                    <Text numberOfLines={1} style={styles.assessmentName}>{props.name}</Text>
                    <Text style={styles.questions}>{questions} questions</Text>
                </View>
            </View>
            <View style={styles.takableRight}>
                <TouchableOpacity onPress={handleRetake}>
                    <MaterialIcons name='arrow-forward-ios' color='#D7A03E' size={28}/>
                </TouchableOpacity>
            </View>
        </View>
        {props.completed && <View style={styles.retakable}>
            <TouchableOpacity onPress={handleRetake}>
                <View style={styles.retakeActions}>
                    <AntDesign name="reload1" color="#FFFFFF" size={27}/>
                    <Text style={styles.retakeText}>Retake</Text>
                </View>
            </TouchableOpacity>
        </View>}
    </View>
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
    fullWidth: {
        width: '100%',
    },
    subWidth: {
        width: width-104
    },
    takable: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        shadowColor: '#1D4348',
        borderRadius: 10,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    takableLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftSubWidth: {
        width: width - 200
    },
    leftFullWidth: {
        width: width - 125
    },
    assessDetail: {
        marginLeft: 8,
        display: 'flex',
        justifyContent: 'flex-start'
    },
    assessmentName: {
        fontSize: 16,
        fontFamily: 'Gotham Rounded',
        fontWeight: '700',
        color: '#1D4348',
    },
    questions: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'Roboto',
        color: '#3B4547'
    },
    retakable: {
        backgroundColor: '#116C40',
        borderRadius: 10,
        height: '100%',
        textAlign: 'center',
        paddingHorizontal: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        elevation: 3, 
        shadowColor: '#1D4348',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    assessIcon: {
        width: 38,
        height: 38
    }, 
    retakeActions: {
        display: 'flex',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    retakeText: {
        marginTop: 4,
        color: '#fff',
        fontSize: 12
    },
});
