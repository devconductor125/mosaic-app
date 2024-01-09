import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const CustomSwitch = ({ onValueChange, value }) => {
  const [isYes, setIsYes] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(value) {
      handlePress()
      setIsYes(value);
      Animated.timing(animatedValue, {
        toValue: isYes ? 0 : 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [value])

  const handlePress = () => {
    setIsYes(!isYes);
    onValueChange(!isYes);
    Animated.timing(animatedValue, {
      toValue: isYes ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'white'], 
  });

  const marginLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Animated.View
        style={[
          styles.switch,
          {
            backgroundColor,
            marginLeft,
          },
        ]}
      />
      <View style={styles.labels}>
        <Text style={[styles.label, {color: isYes? 'white': '#116C40'}]}>No</Text>
        <Text style={[styles.label, {color: isYes? '#116C40': 'white'}]}>Yes</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 54,
    borderRadius: 50,
    backgroundColor: '#116C40',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  switch: {
    position: 'absolute',
    width: '50%',
    borderRadius: 50,
    height: '100%',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    width: '50%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '900',
  },
});

export default CustomSwitch;