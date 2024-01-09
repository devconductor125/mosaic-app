import { StyleSheet, View, Text } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

export default OverviewComponent = ({fillRate = 79}) => {
    return <View style={styles.wrapper}>
        <View style={styles.performanceView}>
            <Text style={styles.performaceTitle}>Performace</Text>
        </View>
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.headerLeft}>
                    Your Efficiency
                </Text>
                <View style={styles.headerRight}>
                    <Text style={styles.headerRightName}>This week</Text>
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.mainContent}>
                    <View >
                        <Text style={styles.totalPercent}>{fillRate} %</Text>
                    </View>
                    <View style = {styles.elementWrapper}>
                        <View style={styles.elementView}>
                            <Text style={styles.elementName}>Financial</Text>
                            <Text style={styles.elementRate}>29%</Text>
                        </View>
                        <View style={styles.elementView}>
                            <Text style={styles.elementName}>Mental</Text>
                            <Text style={styles.elementRate}>50%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.circleProgress}>
                    <AnimatedCircularProgress
                        size={95}
                        width={10}
                        fill={fillRate}
                        tintColor="#18985A"
                        backgroundColor='#E8ECED'
                        rotation={90}

                        onAnimationComplete={() => console.log('onAnimationComplete')}
                    >
                        {
                            (fill) => (
                            <Text>
                                {/* { fillRate } % */}
                            </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
            </View>
        </View>
       
        
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
    },
    performanceView: {
        marginBottom: 11
    },
    performaceTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0A1719',
        fontFamily: 'Roboto'
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 18,
        shadowColor: '#1D4348',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
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
    },
    contentWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContent: {
        width: '60%',
    },
    elementWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 18
    },
    elementView: {
        width: '50%',
    },
    totalPercent: {
        fontSize: 35,
        fontWeight: '700',
        fontFamily: 'Inter',
        color: '#1D4348'
    },
    elementName: {
        fontSize: 14,
        color: '#3B4547',
        fontFamily: 'Roboto'
    },
    elementRate: {
        marginTop: 4,
        color: '#1D4348',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Inter'
    },
    circleProgress: {
        marginRight: 14,
        marginTop: 8
    }
})