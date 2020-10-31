import React from "react";
import { Video } from "./VideoList";

import './VideoItem.css'; 
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";

interface Props {
  video: Video;
}

const VideoItem = ({ video }: Props) => {
  const history = useHistory();

  return (
    <div className="col-md-4">
      <div className="card card-body video-card" onClick={() => history.push(`/update/${video._id}`)}>
        <div className="d-flex justify-content-between">
          <h1>{video.title}</h1>
          <span className="text-danger">x</span>
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
