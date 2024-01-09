import { View, StyleSheet } from "react-native";

export default VerticalDivider  = ({height = 1, color = '#000'}) => {
    return (
        <View style = {[styles.divider, {height: height, backgroundColor: color}]}>
        </View>
    )
}
const styles = StyleSheet.create({
    divider: {
        width: '100%'
    }
})