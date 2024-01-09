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
    const navigation = useNavigation();

    const openMenu = () => {
        // const parentNavigation = navigation.getParent();
        // parentNavigation.dispatch(DrawerActions.openDrawer());
        navigation.dispatch(DrawerActions.openDrawer());
    }

    return <View style = {styles.headerContainer}>
        <View style={styles.blankItem}></View>
        <View>
            <Text style={styles.screenTitle}>Self-Assessments</Text>
        </View>
        <View style={styles.actions}>
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
        alignItems: 'center'
    },
    screenTitle: {
        fontFamily: 'Gotham Rounded',
        fontSize: 18,
        fontWeight: '700',
        color: '#1D4348'
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
        marginHorizontal: 6
    },
    blankItem: {
        width: 50
    }
});

export default Header;