import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { convertDateToString } from '../../../utils/common';
const resultDateFormat = { year: 'numeric', month: 'long', day: 'numeric' }

export default HistoryItem = props => {
    return <View style={styles.wrapper}>
        <View style={styles.content}>
            <Text style={styles.catName}>{props.result.category_name}</Text>
            <Text>
                {convertDateToString(new Date(props.result.created_at), resultDateFormat, true)}
            </Text>
        </View>
        <View style={styles.actions}>
            <MaterialIcons name='arrow-forward-ios' color='#D7A03E' size={28}/>
        </View>
        {/* <Text>
        {props.result.category_name} ss {convertDateToString(new Date(props.result.created_at), resultDateFormat, true)}
        </Text> */}
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1,
    },
    content: {
        paddingVertical: 18,
    },
    catName: {
        fontFamily: 'Gotham Rounded',
        fontSize: 16,
        fontWeight: '600',
        color: '#1D4348'
    }
});