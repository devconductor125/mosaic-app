import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { getAssIconName } from "../../../utils/common";

const demographicIcon  = require('../../../assets/img/icons/assessmet/demographic3x.png');
const environmentalIcon  = require('../../../assets/img/icons/assessmet/environmental3x.png');
const financialIcon  = require('../../../assets/img/icons/assessmet/financial3x.png');
const mentalIcon  = require('../../../assets/img/icons/assessmet/mental3x.png');
const physicalIcon  = require('../../../assets/img/icons/assessmet/physical3x.png');
const pulseIcon  = require('../../../assets/img/icons/assessmet/pulse3x.png');
const socialIcon  = require('../../../assets/img/icons/assessmet/social3x.png');
const spiritualIcon  = require('../../../assets/img/icons/assessmet/spiritual3x.png');

export default AssessmentIntroScreen = ({category, handleNext, buttonText}) => {
    const [imageName, setImageName] = useState('')

    useEffect(() => {
        if(category) {
            let assIcon = getAssIconName(category.name);
            setImageName(assIcon);
        }
    }, [category])

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
    return (
        <View style={styles.wrapper}>
            <View style={styles.iconWrapper}>
                <View style={styles.imageView}>
                    {iconsList[imageName]}
                </View>
            </View>

            <View style={styles.introTitle}>
                <Text style={styles.titleContent}>
                Embark on Your {category.name} Journey
                </Text>
            </View>

            <View style={styles.introTextView}>
                <Text style={styles.introText}>
                    You have embarked on a journey of self-discovery and personal growth. Mosaic Life empowers you to delve deeper into your own experiences and unlock the true potential of a balanced, holistic life.{'\n'}{'\n'}
                    We'll start by completing a series of assessments to gather some important information about you that will be used to customize your action plan and next steps.{'\n'}{'\n'}
                    The more information you provide, the more personalized and accurate the suggestions and guidance will be, allowing you to conquer life's challenges with ease.{'\n'}{'\n'}
                    Let's get started on the path to a more fulfilling and empowered future!
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleNext([])}>
                    <View style={styles.accessmentBtn}>
                        <Text style={styles.accBtnText}>{buttonText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        height: height - 140
    },
    iconWrapper: {
        alignItems: 'center'
    },
    imageView: {
        width: 126,
        height: 126,
        borderRadius: 70,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1D4348',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    assessIcon: {
        width: 76,
        height: 76
    },
    introTitle: {
        marginHorizontal: 40,
        marginTop: 36,
    },
    titleContent: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Gotham Rounded',
        textAlign: 'center',
        color: '#1D4348',
        lineHeight: 28
    },
    introTextView: {
        marginTop: 25
    },
    introText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#3B4547'
    },
    buttonContainer: {
        marginTop: 40,
    },
    accessmentBtn: {
        backgroundColor: '#D7A03E',
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