import React, { useEffect, useState } from "react";
import VideoItem from "./VideoItem";
import * as videoService from "./VideoService";

export interface Video {
  description: string;
  title: string;
  updatedAt?: string | Date;
  createdAt?: string | Date;
  url: string;
  _id?: string;
}

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const loadVideos = async () => {
    const res = await videoService.getVideos();
    const formatedDateVideos = res.data.map(video => {
      return {
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
        updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
      }
    })
    .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
    setVideos(formatedDateVideos);
    /*  const res = await axios.get("http://localhost:4000/videos"); */
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>;
      })}
    </div>
  );
};

export default VideoList;
