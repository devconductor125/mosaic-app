import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../features/auth/slices/authApiSlice';
import { LOG_OUT } from '../redux/constants/actionTypes';
import { useNavigation } from '@react-navigation/native';
import HorizontalDivider from './HorizontalDivider';


function DrawerComponent(props) {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigation = useNavigation();

  const handleLogOut = async (e) => {
    try {
      const responseData = await logout().unwrap()
    } catch (err) {
      console.log("err", err)
    }
    dispatch({ type: LOG_OUT })
    navigation.navigate('LoginScreen')
}

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <View style={styles.wrapper}>
        <Text style={styles.menuItem}>This is Menu</Text>
        <HorizontalDivider height={2} color='#D9D9D9'/>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12
  },
  menuItem: {
    marginVertical: 10,
    fontSize: 16,
    // color: ''
    fontWeight: '500'
  }
})

export default DrawerComponent;