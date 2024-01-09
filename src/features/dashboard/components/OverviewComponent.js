import { StyleSheet, View, Text } from "react-native"
import ImageIcon from "../../../components/ImageIcon"
import VerticalDivider from "../../../components/VerticalDivider";

const badgeIcon = require('../../../assets/img/icons/home/badge.png');
const rankingIcon = require('../../../assets/img/icons/home/ranking.png');

export default OverviewComponent = ({badge = 'Starter', point = 0}) => {
    return <View style={styles.overview}>
        <View style={styles.overviewItem}>
            <View>
                <ImageIcon source={badgeIcon} style={styles.overviewIcon}/>
            </View>
            <View style={styles.overviewItemBox}>
                <View><Text numberOfLines={1} style={styles.overviewItemTitle}>Journey</Text></View>
                <View><Text numberOfLines={1} style={styles.overviewItemValue}>{badge}</Text></View>
            </View>
        </View>
        <VerticalDivider width={1} color='#fff'/>
        <View style={styles.overviewItem}>
            <View>
                <ImageIcon source={rankingIcon} style={styles.overviewIcon}/>
            </View>
            <View style={styles.overviewItemBox}>
                <View><Text numberOfLines={1} style={styles.overviewItemTitle}>My Points</Text></View>
                <View><Text numberOfLines={1} style={styles.overviewItemValue}>{point}</Text></View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    overview: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#FBF6EC',
        marginHorizontal: 16,
        borderRadius: 10,
        marginTop: 20,
    },
    overviewItem: {
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        paddingVertical: 12,
        paddingLeft: 18
    },
    overviewIcon: {
        width: 30,
        height: 30
    },
    overviewItemBox: {
        marginLeft: 9,
        width: '70%'
    },
    overviewItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0A1719'
    },
    overviewItemValue: {
        fontSize: 20,
        fontWeight: '500',
        color: '#0A1719'
    },
})