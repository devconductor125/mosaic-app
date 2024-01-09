import { useEffect } from "react"
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native"
import ImageViewer from "../../../components/ImageViewer"
import ButtonComponent from "../../../components/ButtonComponent"
import { useGetAnalyticsQuery } from "../../users/slices/userApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { SET_CATEGORIES } from "../../../redux/constants/actionTypes"

const completionImage = require('../../../assets/img/icons/assessmet/completion.png')

export default CompletionScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const {
        categories
    } = useSelector(state => state?.quiz);

    const {
        data: analytics,
        isLoading,
        error,
        refetch
    } = useGetAnalyticsQuery();

    const goToHome = async () => {
        await refetch();
        if (analytics) {
            if (analytics.categories && analytics.categories !== categories) {
                dispatch({ type: SET_CATEGORIES, payload: analytics.categories })
            }
        }
        navigation.navigate("AssessmentScreen")
    }
    return <SafeAreaView>
        <View style={styles.wrapper}>
            <ImageViewer source={completionImage} style={styles.completeIcon}/>
            <Text style={styles.completeText}>
                Thank you for completing wellbeing survey
            </Text>
            <View style={styles.gohomeBtn}>
                <ButtonComponent text={'Go to home page'} onPress={goToHome}/>
            </View>
        </View>
    </SafeAreaView>
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height: height
    },
    completeIcon: {
        width: 100,
        height: 100
    },
    completeText: {
        marginTop: 36,
        fontSize: 25,
        fontFamily: 'Gotham Rounded',
        fontWeight: '700',
        color: '#1D4348',
        marginHorizontal: 10,
        textAlign: 'center'
    },
    gohomeBtn: {
        width: '100%',
        marginTop: 30
    }
})