import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { convertDateToString } from '../../../utils/common';
import { useGetResultsMutation, useDeleteResultMutation } from '../slices/quizApiSlice';
import HistoryItem from '../components/HistoryItem';
import AuthCheckComponent from '../../../components/AuthCheckComponent';

const resultDateFormat = { year: 'numeric', month: 'long', day: 'numeric' }

export default History = ({navigation}) => {
    const categories = useSelector(state => state.quiz?.categories);

    const [category, setCategory] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(false);
    const [getResults, { isLoading }] = useGetResultsMutation();
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            handleApply()
        }
    }, [])

    useEffect(() => {
        if(categories) {
            const selectedAll = {
                label: 'All Assessments',
                value: ''
            }
            let assessments = categories?.map(item => ({
                label: item.name,
                value: item.id.toString()
            }));
            assessments.unshift(selectedAll)
            setCategoryList(assessments);
            setCategory(assessments[0].value)
        }
    }, [categories])

    const onChangeDateValue = (event, selDate) => {
        const currentDate = selDate;
        setDate(currentDate);
        setSelectedDate(true);
        handleApply(category, currentDate, true);
    };

    const showDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const clearSelectedDate = () => {
        setSelectedDate(false);
        handleApply(category, null, false);
    }

    const handleApply = (cat = '', dat = null, sel = false) => {
        getResults({ category_id: cat, date: (sel && dat)? dat.getTime() : null, page_size: 10, page: 1 }).unwrap().then(function (res) {
            // setTotalPages(res.total_pages)
            setResults(res.results)
        })
    }

    return <View>
        <AuthCheckComponent navigation={navigation} isPrivate={true} />
        <View style={styles.wrapper}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categoryList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategory(item.value);
                    setIsFocus(false);
                    handleApply(item.value, date, selectedDate);
                }}
                renderLeftIcon={() => (
                <View style={styles.iconWrapper}>
                    <Feather
                        style={styles.icon}
                        color={isFocus ? '#D7A03E' : '#D7A03E'}
                        name="bar-chart-2"
                        size={20}
                    />
                </View>
                )}
            />

            <TouchableOpacity onPress={showDatepicker}>
                <View style={styles.datePickerContainer}>
                    <View style={styles.flexRow}>
                        <Ionicons name='calendar-outline' size={30} color='#D7A03E'/>
                        {selectedDate ? <Text style={styles.selectedDate}>{convertDateToString(date)}</Text> : <Text style={styles.selectedDate}>All Dates</Text>}
                    </View>
                    <View style={styles.flexRow}>
                        {selectedDate && <TouchableOpacity style={styles.clearBtn} onPress={clearSelectedDate}><Text style={{color: 'white'}}>Clear</Text></TouchableOpacity>}
                        {showDatePicker ? <MaterialIcons name='keyboard-arrow-up' color='#1D4348' size={20}/> : <MaterialIcons name='keyboard-arrow-down' color='#1D4348' size={20}/>}
                    </View>
                </View>
            </TouchableOpacity>
            
            {showDatePicker && (<DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                onChange={onChangeDateValue}
                style={styles.datePicker}
                display='spinner'
            />)}
        </View>

        <ScrollView style={styles.resultScroll}>
            <View style={styles.resultWrapper}>
                {results.length > 0 && results.map((result, index) => {
                    return <HistoryItem result={result} key={index}/>
                })}
            </View>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#E7EFF4',
      paddingHorizontal: 16,
      paddingVertical: 33
    },
    dropdown: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
      color: '#1D4348',
      shadowColor: '#1D4348',
      shadowOffset: { width: 3, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    icon: {
      margin: 0,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#3B4547',
      fontFamily: 'Roboto'
    },
    iconWrapper: {
        borderWidth: 2,
        borderColor: '#D7A03E',
        borderRadius: 6,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    datePickerContainer: {
        width: '100%',
        marginTop: 15,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        color: '#1D4348',
        shadowColor: '#1D4348',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedDate: {
        fontSize: 16,
        color: '#3B4547',
        fontFamily: 'Roboto',
        marginLeft: 10
    },
    clearBtn: {
        marginRight: 5,
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: '#1D4348',
        color: '#fff',
        borderRadius: 8
    },
    resultScroll: {
        marginBottom: 180,
        marginTop: 10
    },
    resultWrapper: {
        marginHorizontal: 16
    }
  });