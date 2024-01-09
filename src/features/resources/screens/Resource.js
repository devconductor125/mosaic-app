import {SafeAreaView, View, Text } from "react-native";

import AuthCheckComponent from '../../../components/AuthCheckComponent';

const Resource = ({ navigation }) =>{
    return (
        <SafeAreaView>
            <AuthCheckComponent navigation={navigation} isPrivate={true} />
            <View>
                <Text>Resource Screen!</Text>
            </View>
        </SafeAreaView>
    )

}

export default Resource;