import { View, StyleSheet, TouchableOpacity, Text } from "react-native"

export default CustomButton = ({style, onPress, text}) => {
    return <View style={[styles.buttonContainer, style]}>
        <TouchableOpacity onPress={ onPress }>
            <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 10,
    },
    buttonView: {
        backgroundColor: '#D7A03E',
        paddingVertical: 16,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Gotham Rounded',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
})