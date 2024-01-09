import {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import ImgUserPlaceholder from '../assets/img/avatar.png';
import { isEmpty } from '../utils/isEmpty';

const ImageViewer = props => {
    const [uri, setUri] = useState(null);

    useEffect(() => {
       const source = props.source;
       if (!isEmpty(source)) {
          setUri(source);
          return;
       }
       if (isEmpty(source)) setUri(null);
       
    }, [props]);
 
    return <FastImage source={!isEmpty(uri) ? uri : props?.default_image || ImgUserPlaceholder} style={props.style} resizeMode={props.resizeMode} />;
 };
 
 export default ImageViewer;