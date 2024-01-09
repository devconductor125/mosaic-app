import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import ImageViewer from '../../../components/ImageViewer';
import ImageIcon from '../../../components/ImageIcon';

const questionIcon = require('../../../assets/img/icons/home/question.png');
const menuIcon  = require('../../../assets/img/icons/home/menu.png');

const Header = (props) => {
    const userInfo = props?.userInfo;
    const navigation = useNavigation();

    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return <View style = {styles.headerContainer}>
        <View style={styles.userDetail}>
            <ImageViewer style={{width: 41, height: 41, borderRadius: 30, margin: 2}} source={userInfo?.avatar_url}/>
            <View style={styles.userTitle}>
                <Text style={styles.username}>Hi {userInfo?.first_name} {userInfo?.last_name},</Text>
                <Text style={styles.greetings}>Welcome, to Mosaiclife</Text>
            </View>
            
        </View>
        <View style={styles.actions}>
            <TouchableOpacity>
                <ImageIcon source = {questionIcon} style={styles.actionIcons}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={openMenu}>
                <ImageIcon source = {menuIcon} style={styles.actionIcons}/>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    userDetail: {
        marginLeft: 13,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userTitle: {
        marginLeft: 16
    },
    username: {
        fontSize: 16,
        fontWeight: '700'
    },
    greetings: {
        fontSize: 16
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 7
    },
    actionIcons: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginHorizontal: 6,
    }
});

export default Header;