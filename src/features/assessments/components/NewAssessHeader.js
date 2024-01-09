import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';

export default NewAssessmentHeader = ({total = 10, current = 5}) => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    }

    return <SafeAreaView>
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handleBack}>
                <View style={styles.backBtn}>
                    <Ionicons name='chevron-back' size={20} color='#1D4348'/>
                    <Text style={styles.btnText}>Back</Text>
                </View>
            </TouchableOpacity>
            {current > 0 && <View style={styles.progress}>
                <Text style={styles.progressText}>{current} of {total}</Text>
            </View>}
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        height: 50,
        
    },
    backBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnText: {
        marginLeft: 8,
        fontSize: 18,
        color: '#0A1719'
    },
    progress: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        backgroundColor: '#B7DFCC'
    },
    progressText: {
        color: '#1D4348',
        fontSize: 16
    }
});