import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { grayScale500, grayScale400 } from '../../../utils/colors';

const LandingDescriptionComponent = ({title, description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: grayScale500,
        textAlign: 'center',
        fontFamily: 'Gotham Rounded',
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight: '700'
    },
    description :{
        color: grayScale400,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        marginTop: '5%'
    }
})

export default LandingDescriptionComponent;