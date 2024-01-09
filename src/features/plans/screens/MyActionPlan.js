import {SafeAreaView, View, Text } from "react-native";

import AuthCheckComponent from '../../../components/AuthCheckComponent';

const MyActionPlan = ({ navigation }) =>{
    return (
        <SafeAreaView>
            <AuthCheckComponent navigation={navigation} isPrivate={true} />
            <View>
                <Text>Action Plan Screen!</Text>
            </View>
        </SafeAreaView>
    )

}

export default MyActionPlan;