import React, {useRef, useState, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useGetMediaFileQuery } from '../features/dashboard/slices/myAssessmentsApiSlice';
import { extractVideoID } from '../utils/y2videoId';


export default YoutubeComponent = (props) => {

    const controlRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [isMute, setMute] = useState(false);
    const [videoId, setVideoId] = useState('');
    
    const {
        data: videoFile,
        isLoading
    } = useGetMediaFileQuery({ key: props.videoId });

    useEffect(()=> {
        let id = extractVideoID(videoFile?.url);

        console.log(videoFile)
        setVideoId(id);
    }, [videoFile])

    const onStateChange = (state) => {
        if (state === 'ended') {
          setPlaying(false);
        }
        if (state !== 'playing') {
          setPlaying(false);
        }
    };

    return <YoutubePlayer
        height={props.height}
        ref={controlRef}
        play={playing}
        mute={isMute}
        videoId={videoId}
        onChangeState={onStateChange}
    />
}