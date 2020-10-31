import React, { useEffect, useState } from 'react';
import VideoItem from './VideoItem';
import * as videoService from './VideoService';

export interface Video {
    description: string;
    title: string;
    updatedAt?: string;
    createdAt?: string;
    url: string;
    _id?: string;
}
  
const VideoList = () => {

    const [videos, setVideos] = useState<Video[]>([]);

    const loadVideos = async () => {
        const res = await videoService.getVideos();
        setVideos(res.data);
        /*  const res = await axios.get("http://localhost:4000/videos"); */
    } 
     

    useEffect(() => {

    loadVideos(); 
    }, []); 

    return (
        <div>
            {
            videos.map((video) =>(
                <>
                    <VideoItem video={video} key={video._id}/>
                </>
                ))
            }
        </div>
    );
};

export default VideoList;
