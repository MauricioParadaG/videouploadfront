import React, { ChangeEvent, FormEvent, useState } from "react";
import { Video } from "./VideoList";
import * as videoService from './VideoService';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {

    const history = useHistory();

    const [video, setVideo] = useState<Video>({title:'', description:'', url:''});

    const handleInputChange = (event:InputChange) =>{
        setVideo({...video, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const res = await videoService.createVideo(video);
        setVideo(res.data);
        toast.success("New video added");
        history.push('/');
    }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <input type="text"
                name="title"
                placeholder="Write a title for this video"
                className="form-control"
                onChange={handleInputChange}
                autoFocus
                />
                </div>
                <div className="form-group">
                <input type="text"
                name="url"
                placeholder="https://www.youtube.com/WriteYourVideo"
                className="form-control"
                onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <textarea name="description" 
                placeholder="Description"
                rows={3}
                className="form-control"
                onChange={handleInputChange}
                >
                </textarea>
                </div>

                <button className="btn btn-primary">
                    Add the video to favorites
                </button>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
