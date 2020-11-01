import React from "react";
import { Video } from "./VideoList";

import './VideoItem.css'; 
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import * as videoService from './VideoService';

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
  const history = useHistory();

  const handleDelete = async (id: string) =>{
    const res = await videoService.deleteVideo(id);
    loadVideos();
  }

  return (
    <div className="col-md-4">
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h1 onClick={() => history.push(`/update/${video._id}`)}>{video.title}</h1>
          <span className="text-danger" onClick={() => video._id && handleDelete(video._id)}>x</span>
        </div>
        <p>{video.description}</p>
        <div className="embed-responsive embed-responsive-16by9">
        <ReactPlayer url={video.url} />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
