import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import PieChart from 'react-native-pie-chart';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';
import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useGetRecommendationMutation } from '../../plans/splices/planApiSlice';

const sliceColor = ['#46AD7B', '#95D0B3', '#EDD3A6', '#E4BF7E', '#D7A03E', '#116C40'];
const colorDescription = ["Mental Well-being", "Physical Well-being", "Financial Well-being", "Spiritual Well-being", "Environmental Well-being", "Social Well-being"]


export default Report = () => {
    const { user } = useSelector(state => state?.auth);
    const [getRecommendation] = useGetRecommendationMutation()
    
    const widthAndHeight = 250
    const series = [13, 12, 12, 13, 10, 25]

    const chartData = [
        {
            color: '#46AD7B',
            title: "Mental Well-being"
        },
        {
            color: '#95D0B3',
            title: "Physical Well-being"
        },
        {
            color: '#EDD3A6',
            title: "Financial Well-being"
        },
        {
            color: '#E4BF7E',
            title: "Spiritual Well-being"
        },
        {
            color: '#D7A03E',
            title: "Environmental Well-being"
        },
        {
            color: '#116C40',
            title: "Social Well-being"
        }
    ];

    useFocusEffect(
        useCallback(() => {
            console.log('Screen was focused');
            initReports()
            return () => {
            console.log('Screen was unfocused');
            };
        }, [])
    );

    const initReports = () => {
        getRecommendation({ order: 0 }).unwrap().then(function (res) {
            console.log(res)
        })
    }

    return <ScrollView>
        <View style={styles.wrapper}>
            <Text style={styles.intro}>
                Hello, {user?.first_name} {user?.last_name} based on the information provided, here is a summary of your current state across various health categories: 
            </Text>
            <View style={styles.reportChart}>
                <Text style={styles.chartTitle}>Your Life Balance</Text>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.55}
                    coverFill={'#FFF'}
                />
            </View>
            <View style={[styles.colorDescs]}>
                <ScrollView
                    horizontal = {false}
                    showsHorizontalScrollIndicator={false}
                >
                <FlatList
                    data={chartData}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    scrollEnabled = {false}
                />
                </ScrollView>
            </View>
            
        </View>
    </ScrollView>
}

const renderItem = ({ item, index }) => {
    return <View style={styles.flatItem}>
        <View style={[styles.itemColor, { backgroundColor: item.color}]}></View>
        <Text numberOfLines={1} style={styles.itemDesc}>{item.title}</Text>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
        marginHorizontal: 16
    },
    intro: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#3B4547'
    },
    reportChart: {
        marginTop: 20,
        alignItems: 'center'
    },
    chartTitle: {
        fontFamily: 'Gotham Rounded',
        fontSize: 18,
        color: '#1D4348',
        fontWeight: '700',
        marginBottom: 18
    },
    colorDescs: {
        marginTop: 35,
        marginHorizontal: -8
    },
    flatItem: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
        paddingHorizontal: 4,
        marginHorizontal: 8
    },
    itemColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    itemDesc: {
        marginLeft: 12,
        fontSize: 16,
        fontFamily: 'Roboto'
    }
})