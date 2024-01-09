import { useEffect, useState } from 'react'
import {Text, View, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useGetResourcesMutation } from '../../resources/slices/resourcesApiSlice';
import { VIDEO } from '../../../utils/constants';
import ImageViewer from '../../../components/ImageViewer';

export default ResourcesComponent = () => {
    const [getResources, { isLoading }] = useGetResourcesMutation();
    const resourceType = VIDEO;
    const pageSize = 10;
    const currentPage = 1;
    const isShowMyResourcesOnly = false;
    const area = '';

    const [data, setData] = useState([]);

    useEffect(() => {
        getResources({ type: resourceType, page_size: pageSize, page: currentPage, is_save: isShowMyResourcesOnly, area: area }).unwrap().then(function (res) {
            if (res.results) {
                setData(res.results)
            } else if (res.status == 'no data') {
                setData([])
            } else if (res.status == 'no data with filter') {
                setData([])
            }
        }).catch(function (err) {
            console.log("Err", err)
        });

    }, []);

	const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '.');

    const renderItem = ({item}) => {
        return (
          <View style={styles.resourceItem}>
            <View style={styles.thumbnailView}>
                <Image src={item.thumbnail} style={styles.thumbnail} />
            </View>
            <View style={styles.contents}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style = {styles.author}>{item.author}</Text>
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}>
					<View style={styles.watchBtn}>
						<AntDesign name='play' color='#D7A03E' size={18}/>
						<Text style={styles.watchBtnText}>Watch Now</Text>
					</View>
				</TouchableOpacity>
            </View>
          </View>
        );
      };
    

    return <View style={styles.wrapper}>
        <View style={styles.componentTitle}>
            <Text style={styles.titleContent}>My Resources</Text>
            <View>
               	{data.length>0 && <TouchableOpacity style={styles.headerRight}>
                    <Text style={styles.headerRightName}>View All</Text>
                    <FontAwesome6 name='arrow-right' size={15} color='#5B6465'/>
                </TouchableOpacity>}
            </View>
        </View>
        <View style={styles.resourceWrapper}>
			{isLoading ? <Text style={styles.noResource}>Loading...</Text>:data.length > 0 ? <FlatList
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{paddingVertical: 10, paddingHorizontal: 8}}
            /> : <View>
                <Text style={styles.noResource}>No Resources</Text>
            </View>}
        </View>
        <View>
			<TouchableOpacity >
				<View style={styles.dailyAffir}>
					<View style={styles.affirs}>
						<MaterialCommunityIcons name='calendar-check-outline' size={30} color='#1D4348'/>
						<Text style={styles.affirsTitle}>Your Daily affirmation</Text>
					</View>
					<View style={styles.affirs}>
						<Text style={styles.affirsDate}>{dateString}</Text>
						<MaterialIcons name='arrow-forward-ios' color='#1D4348' size={20}/>
					</View>
				</View>
			</TouchableOpacity>

        </View>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        marginHorizontal: 16,
    },
    componentTitle: {
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleContent: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0A1719',
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
        marginRight: 8
    },
    resourceItem: {
        width: 260,
        padding: 11,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 15,
        flexDirection: 'row',
        shadowColor: '#1D4348',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
	author: {
		color: '#3B4547',
		fontSize: 12,
		fontFamily: 'Roboto',
		marginVertical: 2
	},
	watchBtn: {
		flexDirection: 'row',
		padding: 4,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#D7A03E',
		borderRadius: 20,
		marginTop: 2,
	},
	watchBtnText: {
		marginLeft: 6,
		fontSize: 12,
		marginRight: 4
	},
    contents: {
        marginLeft: 12
    },
    title: {
        width: 150,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'Roboto',
        color: '#0A1719'
    },
	dailyAffir: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 12,
		paddingVertical: 9,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#1D4348',
		borderRadius: 10,
		marginTop: 4
	},
	noResource: {
		color: '#3B4547',
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 20
	},
	affirs: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	affirsTitle: {
		fontSize: 14,
		fontFamily: 'Roboto',
		fontWeight: '700',
		color: '#1D4348',
	},
	affirsDate: {
		color: '#688184',
		fontSize: 14,
		fontFamily: 'Roboto',
		marginRight: 10
	}
})