import React from 'react';
import { Image, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

export default ImageIcon = props => {
   return <FastImage source = {props.source} style={props.style}/>
}