import { View, StyleSheet } from "react-native";

export default VerticalDivider  = ({width, color}) => {
    return (
        <View style = {[styles.divider, {width: width, backgroundColor: color}]}>
        </View>
    )
}
const styles = StyleSheet.create({
    divider: {
    }
})