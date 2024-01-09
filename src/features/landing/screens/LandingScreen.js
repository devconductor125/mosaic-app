import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import PagerView from 'react-native-pager-view';

import LandingDescriptionComponent from '../components/LandingDescriptionComponent';
import { green100, green500, yellow500 } from '../../../utils/colors';
import AuthCheckComponent from '../../../components/AuthCheckComponent';


const textDescriptions = [
    {
        title: 'New AI powered life coach',
        description: 'Always ready to guide you to better wellbeing. Help you to live happier, healthier and more balanced life.'
    },
    {
        title: 'Start by taking detailed assessements',
        description: 'Consider every aspect of your wellbeing, to provide the most effective recommendations for you.'
    },
    {
        title: 'Receive an assessment report and select areas to prioritize',
        description: 'Comprehensive view of your current wellbeing, Based on your selections, we will generate a custom master plan just for you.'
    },
    {
        title: 'Track your progress regularly',
        description: 'Witness your own personal growth'
    }
]

const LandingScreen = ({ route, navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const pagerRef = useRef(null);

    const images = [
        require('./../../../assets/img/landing-slide1.png'),
        require('./../../../assets/img/landing-slide2.png'),
        require('./../../../assets/img/landing-slide3.png'),
        require('./../../../assets/img/landing-slide4.png'),
    ];

    const handlePageChange = (index) => {
        setActiveIndex(index);
        pagerRef.current?.setPage(index);
    };

    const scrollToNextPage = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        pagerRef.current?.setPage(nextIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(scrollToNextPage, 2000);

        return () => clearInterval(intervalId);
    }, [activeIndex]);

    const handleGetStarted = () => {
        navigation.navigate('LoginScreen')

    }

    return (
        <SafeAreaView style={styles.container}>
            <AuthCheckComponent navigation={navigation} isPrivate={false} />
            {/* Image at the top */}
            <View style={styles.topSection}>
                <PagerView
                    ref={pagerRef}
                    style={styles.pagerView}
                    overdrag={true}
                    orientation={'horizontal'}
                    scrollEnabled={true}
                    onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}>
                    {images.map((image, index) => (
                        <View style={styles.imageView} key={index}>
                            <Image style={styles.image} resizeMode="contain" source={image} />
                        </View>
                    ))}
                </PagerView>
                <View style={styles.dotNavigation}>
                    {images.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePageChange(index)}
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: index === activeIndex ? green500 : green100,
                                marginHorizontal: 5,
                            }}
                        />
                    ))}
                </View>

            </View>
            {/* Dots for Navigation */}

            {/* Additional Content at the Bottom */}
            <View style={styles.textSection}>
                <LandingDescriptionComponent title={textDescriptions[activeIndex].title} description={textDescriptions[activeIndex].description} />
            </View>
            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.getStartedBtn} onPress={() => handleGetStarted()}>
                    <Text style={styles.getStartedBtnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FBFD', alignContent: 'center', fontFamily: 'Roboto' },
    topSection: { flex: 5, paddingTop: '10%', paddingLeft: '2%', paddingRight: '2%' },
    pagerView: { flex: 1 },
    imageView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '90%' },
    dotNavigation: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%' },
    textSection: { flex: 2, marginTop: '5.7%', paddingLeft: '3.2%', paddingRight: '3.2%', justifyContent: 'center', alignItems: 'center' },
    bottomSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    getStartedBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: width * 0.9,
        height: '35%',
        flexShrink: 0,
        justifyContent: 'center'
    },
    getStartedBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    }
});
export default LandingScreen;