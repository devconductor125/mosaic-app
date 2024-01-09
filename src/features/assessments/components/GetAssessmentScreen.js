import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, useWindowDimensions, TextInput } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useToast } from "react-native-toast-notifications";
import RenderHtml from 'react-native-render-html';

import { convertVisiblePhase, isBigger } from "../../../utils/common";
import CustomSwitch from "../../../components/CustomSwitch";

export default GetAssessmentScreen = ({problem, buttonText, result, step, totalQuiz, handleNext, handleComplete, handlePrev}) => {
    const toast = useToast();
    const [valid, setValid] = useState([false, false, false, false]);
    const [quizVisible, setQuizVisible] = useState([false, false, false, false]);
    const [validRequired, setValidRequired] = useState([false, false, false, false]);
    const [answers, setAnswers] = useState([]);
    
    const handleClickNext = () => {
        const arraysAreEqual = isBigger(valid, validRequired)
        if(arraysAreEqual) {
            if(totalQuiz == step) handleComplete(answers)
            else handleNext(answers)
        } else {
            toast.show("Response required", {
                type: "danger", //"normal | success | warning | danger | custom"
                placement: "bottom",
                duration: 1000,
                offset: 30,
                animationType: "slide-in",
            });
        }
    }

    useEffect(() => {

        const visibledQuiz = problem?.elements?.filter(a => !a.visibleIf || result[a.name]);
        const currentVisibles = Array.from({ length: 4 }, (_, index) => index < visibledQuiz?.length);
        setQuizVisible(currentVisibles)

        const validReqQuiz = visibledQuiz.filter(a => a.isRequired == true)
        const curValidRequired = Array.from({length: 4}, (_, index) => index < validReqQuiz?.length);
        setValidRequired(curValidRequired)

        const validatedQuiz = problem?.elements?.filter(a => a.isRequired == true && (result[a.name] || a.type == 'boolean'));
        const validatedQuizInit = Array.from({length: 4}, (_, index) => index < validatedQuiz?.length);
        setValid(validatedQuizInit)

    }, [problem])


    const onAnswer = (validated, quizIndex, answerValue) => {
        // console.log("On Answer: ", validated, quizIndex, answerValue);

        let curAnswer = [...answers];
        curAnswer[quizIndex] = answerValue;
        setAnswers(curAnswer);

        let validStatus = [...valid];
        validStatus[quizIndex] = validated;
        setValid(validStatus);

        if(problem?.elements[quizIndex+1]) {
            const quizVisiblePhase = problem?.elements[quizIndex+1].visibleIf
            if(quizVisiblePhase){
                const visiableText = quizVisiblePhase.split('or');
                for(let vi in visiableText) {
                    const resultObject = convertVisiblePhase(visiableText[vi].trim());
                    if(resultObject.name === answerValue.name && resultObject.value === answerValue.value) {
                        let currentVisible = [...quizVisible];
                        currentVisible[quizIndex+1] = true;
                        setQuizVisible(currentVisible)
                        if(problem?.elements[quizIndex+1].isRequired){
                            let currentRequired = [...validRequired];
                            currentRequired[quizIndex+1] = true;
                            setValidRequired(currentRequired);
                        }
                        break;
                    } else {
                        let currentVisible = [...quizVisible];
                        currentVisible[quizIndex+1] = false;
                        setQuizVisible(currentVisible)
                        let currentRequired = [...validRequired];
                        currentRequired[quizIndex+1] = false;
                        setValidRequired(currentRequired);
                    }
                }
            }
        }
    }

    return <View style={styles.wrapper}>
        {problem?.title && <Text style={styles.quizName}>
            {problem?.title}{': '}
            <Text style={styles.quizIntro}>
                {problem?.description}
            </Text>
        </Text>}
        <View style={styles.answerSection}>
            {problem?.elements?.map((element, index) =>{
                if(quizVisible[index]) {
                    return <View key={index}>
                        <Text style={styles.quizItemTitle}>{element.title}  {element.isRequired && <FontAwesome6 name='asterisk' color='#D7A03E' size={16}/>}</Text>
                        <AnswerComponent quiz = {element} quizIndex = {index} onAnswer={onAnswer} result={result}/>
                    </View>
                }
            })}
        </View>
        <View style={styles.buttonContainer}>
            {step > 1 && <TouchableOpacity onPress={handlePrev} style={[styles.accessmentBtn, step > 1 ? {width: '48%'} : {width: '100%'}]}>
                <View >
                    <Text style={styles.accBtnText}>{'Previous'}</Text>
                </View>
            </TouchableOpacity>}
            <TouchableOpacity onPress={handleClickNext} 
                style={[
                    styles.accessmentBtn,
                    {width: (step > 1 ? '48%' : '100%')},
                    {backgroundColor: (totalQuiz == step ? '#116C40' : '#D7A03E')}
                ]}>
                <View >
                    <Text style={styles.accBtnText}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
}

const AnswerComponent = ({quiz, quizIndex, onAnswer, result}) => {
    const type = quiz?.type;
    const radioHandler = (value) => {
        const answerObj = {
            name: quiz.name,
            value: value
        }
        onAnswer(true, quizIndex, answerObj)
    }

    const switchHandler = (value) => {
        const answerObj = {
            name: quiz.name,
            value: value
        }
        onAnswer(true, quizIndex, answerObj)
    }

    const textHandler = (value) => {
        const answerObj = {
            name: quiz.name,
            value: value
        }
        if(value.trim().length > 0) onAnswer(true, quizIndex, answerObj)
        else onAnswer(false, quizIndex, answerObj)
    }

    switch(type) {
        case 'radiogroup':
            return <RadioAnswer choices={quiz?.choices} handler={radioHandler} result={result} quizName = {quiz?.name}/>
        case 'boolean': 
            return <SwitchAnswer handler={switchHandler} result={result} quizName = {quiz?.name} quizIndex = {quizIndex}/>
        case 'comment': 
            return <TextAnswer handler={textHandler} result={result} quizName = {quiz?.name} quizIndex = {quizIndex}/>
        case 'html':
            return <HTMLAnswer content={quiz?.html} result={result} quizName = {quiz?.name} quizIndex = {quizIndex}/>
        default: break;
    }
}

const SwitchAnswer = ({handler, result, quizName, quizIndex}) => {
    const [value, setValue] = useState(result[quizName] ?? false);
    const [defaultValue, setDefaultValue] = useState(result[quizName] ?? false)

    const handleSwitch = (value) => {
        setValue(value)
    }

    useEffect(() => {
        setDefaultValue(result[quizName] ?? false)
    }, [quizIndex])

    useEffect(() => {
        handler(value)
    }, [value, defaultValue])

    return <View style={styles.switchWrapper}>
        <CustomSwitch onValueChange={handleSwitch} value={defaultValue}/>
    </View>
}

const TextAnswer = ({handler, result, quizName, quizIndex}) => {
    const [value, setValue] = useState('');
    const maxLength = 500

    const onChangeText = (text) => {
        setValue(text);
        handler(text)
    }

    useEffect(() => {
        setValue(result[quizName] ?? '')
    }, [quizIndex]);

    return <View style={styles.textAnswerWrapper}>
        <TextInput 
            editable
            multiline
            numberOfLines={4} 
            maxLength={maxLength}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.textAnswer}
        />
        <Text style={styles.textAnswerCounter}>
            {value.length} / {maxLength}
        </Text>
    </View>
}

const HTMLAnswer = ({content}) => {
    const { width } = useWindowDimensions();
    return (
        <View style={styles.htmlWrapper}>
            <RenderHtml
                baseStyle={styles.htmlContent}
                contentWidth={width}
                source={{html: content}}
            /> 
        </View>
    )
}

const RadioAnswer = ({choices, handler, result, quizName, quizIndex}) => {
    const [value, setValue] = useState('');

    const handleCheck = checked => {
        setValue(checked.value);
        handler(checked.value);
    }

    useEffect(() => {
        setValue(result[quizName] ?? '')
    }, [quizIndex, choices])
    
    const handleCheckNoValue = checked => {
        setValue(checked);
        handler(checked);
    }

    return (
        <View style={styles.radioWrapper}>
            {choices?.map((choice, index) => {
                if(choice.value) {
                    return <Pressable key={index} style={[styles.radioItem, value == choice.value ? styles.radioCheckedItem : styles.radioUnCheckedItem]} onPress={() => handleCheck(choice)}>
                        {value == choice.value ? <MaterialCommunityIcons name='checkbox-marked-circle' color='#116C40' size={20}/>: <MaterialCommunityIcons name='checkbox-blank-circle-outline' size={20} color='#97A9AB'/>}
                        <Text style={styles.radioText}>{choice.text}</Text>
                    </Pressable>
                } else {
                    return <Pressable key={index} style={[styles.radioItem, value == choice ? styles.radioCheckedItem : styles.radioUnCheckedItem]} onPress={() => handleCheckNoValue(choice)}>
                        {value == choice ? <MaterialCommunityIcons name='checkbox-marked-circle' color='#116C40' size={20}/>: <MaterialCommunityIcons name='checkbox-blank-circle-outline' size={20} color='#97A9AB'/>}
                        <Text style={styles.radioText}>{choice.trim()}</Text>
                    </Pressable>
                }
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    //text answer stylesheet
    textAnswerWrapper: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B9C5C6',
        borderStyle: 'solid',
        textAlignVertical: 'top',
        height: 175,
        marginTop: 8,
        justifyContent: 'space-between'
    },
    textAnswer: {
        fontSize: 16,
        fontFamily: 'Roboto',
        height: 128,
        color: '#3B4547'
    },
    textAnswerCounter: {
        alignSelf: 'flex-end',
        color: '#3B4547',
    },

    switchWrapper: {
        marginVertical: 20,
        backgroundColor: 'transparent',
        shadowColor: '#1D4348',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.46,
        shadowRadius: 10,
        elevation: 5,
    },

    //html stylesheet
    htmlWrapper: {
        marginTop: 8
    },
    htmlContent: {
        color: '#3B4547',
        fontSize: 16
    },
    //radio stylesheet
    radioWrapper: {
        marginTop: 4
    },
    radioItem: {
        marginVertical: 6,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioCheckedItem: {
        borderColor: '#116C40',
        borderWidth: 2
    },
    radioUnCheckedItem: {
        borderColor: '#B9C5C6',
        borderWidth: 1
    },
    radioText: {
        marginLeft: 10,
        color: '#3B4547',
        fontSize: 16,
        fontFamily: 'Roboto'
    },

    quizName: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#0A1719'
    },
    quizItemTitle: {
        marginTop: 12,
        fontFamily: 'Gotham Rounded',
        fontSize: 18,
        fontWeight: '700',
        color: '#1D4348',
        lineHeight: 22
    },
    quizIntro: {
        fontWeight: '400',
        color: '#3B4547'
    },
    answerSection: {
        marginTop: 20
    },
    buttonContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    accessmentBtn: {
        backgroundColor: '#D7A03E',
        paddingVertical: 16,
        borderRadius: 10,
    },
    accBtnText: {
        textAlign: 'center',
        fontFamily: 'Gotham Rounded',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
})