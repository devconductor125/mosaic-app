import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native"

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const TakenProgressItem = (props) => {
    return (
        <View style={[styles.takenItem, {width: props.width}]}></View>
    )
}
const UnTakenProgressItem = (props) => {
    return (
        <View style={[styles.unTakenItem, {width: props.width}]}></View>
    )
}

const {width, height} = Dimensions.get('window');

export default AssessmentTaken = ({assNum = 7, takenNum = 3}) => {
    const progress = new Array(assNum).fill(0).fill(1, 0, takenNum);
    const itemWidth = (width - 32)/assNum- 5;
    const navigation = useNavigation();

    const goToAssessment = () => {
        navigation.navigate('AssessmentScreen')
    }

    return <View style={styles.wrapper}>
        <View style={styles.header}>
            <Text style={styles.headerLeft}>
                Assessments Taken
            </Text>
            <TouchableOpacity style={styles.headerRight} onPress={goToAssessment}>
                <Text style={styles.headerRightName}>Retake assessments</Text>
                <FontAwesome6 name='arrow-right' size={15} color='#5B6465'/>
            </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
            {progress.map((item, index) => {
                if(item == 1) return <TakenProgressItem key={index} width={itemWidth}>1</TakenProgressItem>
                else return <UnTakenProgressItem key={index} width={itemWidth}>0</UnTakenProgressItem>
            })}
        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginVertical: 25
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerLeft: {
        color: '#0A1719',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRightName: {
        fontSize: 14,
        color: '#5B6465',
        fontFamily: 'Roboto',
        marginRight: 8
    },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 22
    },
    takenItem: {
        backgroundColor: '#1D4348',
        height: 10,
        borderRadius: 10,
        marginHorizontal: 3,
    },
    unTakenItem: {
        backgroundColor: '#E8ECED',
        height: 10,
        borderRadius: 10,
        marginHorizontal: 3,
    }
})