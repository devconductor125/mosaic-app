import { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native"
import NewAssessHeader from "../components/NewAssessHeader"
import { ScrollView } from "react-native-gesture-handler"
import AuthCheckComponent from "../../../components/AuthCheckComponent"
import { useGetCategoryQuery, useSaveResultMutation } from "../slices/quizApiSlice"
import GetAssessmentScreen from "../components/GetAssessmentScreen"
import AssessmentIntroScreen from "./AssessmentIntroScreen"

export default NewAssessmentScreen = ({route, navigation}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const { catId, totalQuiz } = route.params;
    const [buttonText, setButtonText] = useState('Start');
    const [allProblems, setAllProblems] = useState([]);
    const [answer, setAnswer] = useState({});

    const [saveResult, { isMutationLoading }] = useSaveResultMutation();

    const {
        data: category,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoryQuery(catId)

    useEffect(() => {
        if(category) {
            if(category.quiz_forms.length > 0){
                const surveyPages = category.quiz_forms[0].survey_form_json;
                const problems = JSON.parse(surveyPages)['pages'];
                const realQuestions = problems.filter(a => a.elements?.length > 0);
                setAllProblems(realQuestions);
            }
        }
    }, [category])
    
    useEffect(() => {
        if(currentStep == 0) {
            setButtonText('Start')
        } else if(currentStep == totalQuiz) {
            setButtonText('Complete')
        } else {
            setButtonText('Next')
        }
    }, [currentStep])

    const handleNext = (answers) => {
        let curAnswer = {...answer};
        for(let aId in answers) {
            curAnswer[answers[aId].name] = answers[aId].value
        }
        setAnswer(curAnswer);

        if(currentStep < totalQuiz) {
            const current = currentStep + 1;
            setCurrentStep(current);
        }
    }

    const handleComplete = (final) => {
        let curAnswer = {...answer};
        for(let aId in final) {
            curAnswer[final[aId].name] = final[aId].value
        }
        setAnswer(curAnswer);
        const response = saveResult({ result_json: curAnswer, quiz_form_id: category?.quiz_forms[0]?.id}).unwrap()
        navigation.navigate('SurveyCompletionScreen');
    }

    const handlePrev = () => {
        if(currentStep > 1) {
            const current = currentStep - 1;
            setCurrentStep(current);
        }
    }

    return <SafeAreaView>
        <AuthCheckComponent navigation={navigation} isPrivate={true} />
        <NewAssessHeader total={totalQuiz} current={currentStep}/>
        <ScrollView style={styles.scrollView}>
            <View style={styles.wrapper}>
                { currentStep  == 0 && 
                    <AssessmentIntroScreen 
                        category = {category} 
                        handleNext={handleNext} 
                        buttonText = {buttonText}/>}
                {currentStep > 0 && <GetAssessmentScreen 
                    problem = {allProblems[(currentStep-1)]} 
                    step = {currentStep}
                    totalQuiz = {allProblems?.length}
                    result = {answer}
                    buttonText = {buttonText} 
                    handleNext = {handleNext} 
                    handlePrev = {handlePrev}
                    handleComplete = {handleComplete}
                />}
            </View>
        </ScrollView>
    </SafeAreaView>
}

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
    },
    scrollView: {
        height: height - 125
    }
})