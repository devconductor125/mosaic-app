import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { grayScale400, grayScale50, grayScale500, green100, green400, green50, green500, successNormal, yellow100, yellow500 } from '../../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const checkIcon = require('./../../../assets/img/check.png')

const PlanCard = ({ setting, isProcessing, handlePurchase }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFF', '#FFF']}
                locations={[0.1318, 0.8245]}
                style={styles.shadow}
            />
            <View style={styles.innnerContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 8 }}>
                        <View style={{ alignSelf: 'flex-start', backgroundColor: yellow100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingLeft: 14, paddingRight: 14, paddingBottom: 5 }}>
                            <Text style={{ color: grayScale500, fontFamily: 'Roboto', fontSize: 16, fontWeight: '700' }}>
                                {setting.product_name}
                            </Text>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <Text style={{ color: grayScale400, fontSize: 16, fontWeight: 400, fontFamily: 'Roboto' }}>
                                {setting.product_description}
                            </Text>
                        </View>

                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                        {setting.logo &&
                            <Image style={{ width: 50, height: 50 }} resizeMode="contain" source={{ uri: setting.logo }} />
                        }
                    </View>

                </View>
                <View style={{ marginTop: '10%' }}>
                    <Text style={{ fontFamily: 'Gotham Rounded', fontSize: 30, fontWeight: '700', color: green500 }}>${setting.unit_amount / 100}/{setting.interval}</Text>
                </View>
                {
                    setting.metadata ?
                        <View style={{ flexDirection: 'column', alignItems: 'stretch', width: '100%',marginTop:'5%' }}>
                            {
                                setting.metadata.map((meta, index) => (
                                    <View key={index} style={{ marginTop: '5%', flexDirection: 'column', alignItems: 'stretch' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image resizeMode="contain" source={checkIcon} />
                                            <Text style={{ marginLeft: 2, color: grayScale400, fontFamily: 'Roboto', fontSize: 16, fontWeight: '400' }}>
                                                {meta}
                                            </Text>
                                        </View>
                                        {index + 1 < setting.metadata.length &&
                                            <View style={{ height: 1, width: '100%', marginTop: '6%', backgroundColor: green100 }}></View>
                                        }
                                    </View>
                                ))
                            }
                        </View>
                        : ''
                }

            </View>
            <View style={{ marginTop: '10%' }}>
                <TouchableOpacity disabled={isProcessing} style={[styles.getStartedBtn, isProcessing ? { backgroundColor: yellow100 } : {}]} onPress={() => handlePurchase(setting)}>
                    <Text style={styles.getStartedBtnText}>Purchase</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 17,
        backgroundColor: 'white',
        padding: '5% 5% 10% 5%',
        marginTop: 30,
        opacity: 1
    },
    shadow: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'transparent', // Set background to transparent to see the gradient
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(29, 67, 72, 0.3)',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                shadowRadius: 20,
            },
            android: {
                elevation: 5,
            },
        }),
    }, 
    innnerContainer: {
        alignItems: 'flex-start'

    },
    getStartedBtn: {
        borderRadius: 8,
        backgroundColor: yellow500,
        width: '100%',
        height: 45,
        flexShrink: 0,
        justifyContent: 'center'
    },
    getStartedBtnText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '600'
    },

})

export default PlanCard;