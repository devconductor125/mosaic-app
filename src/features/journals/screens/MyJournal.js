import {SafeAreaView, View, Text } from "react-native";

import AuthCheckComponent from '../../../components/AuthCheckComponent';

const MyJournal = ({ navigation }) =>{
    return (
        <SafeAreaView>
            <AuthCheckComponent navigation={navigation} isPrivate={true} />
            <View>
                <Text>Journal Screen!</Text>
            </View>
        </SafeAreaView>
    )

}

export default MyJournal;