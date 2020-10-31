import React from 'react';
import {Video} from './VideoList'

interface Props {
    video: Video;
}

const VideoItem = ({video}: Props) => {
    return (
        <>
            <h1>{video.title}</h1>
            <p>{video.description}</p>
        </>
    )
}

export default VideoItem;
