import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Video } from "./VideoList";
import * as videoService from './VideoService';
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id: string;
}

const VideoForm = () => {

    const history = useHistory();
    const params = useParams<Params>();
    //console.log(params);

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

    const getVideo = async (id:string) => {
      const res = await videoService.getVideo(id);
      //console.log(res);
      const {title, description, url} = res.data;
      setVideo({title, description, url});
    }

    useEffect(() => {
      if(params.id) 
      getVideo(params.id);
    }, []);

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
                value={video.title}
                autoFocus
                />
                </div>
                <div className="form-group">
                <input type="text"
                name="url"
                placeholder="https://www.youtube.com/WriteYourVideo"
                className="form-control"
                value={video.url}
                onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <textarea name="description" 
                placeholder="Description"
                rows={3}
                className="form-control"
                value={video.description}
                onChange={handleInputChange}
                >
                </textarea>
                </div>

            {
              params.id  ? 
              <button className="btn btn-primary">
                Update video
            </button>
            :
              <button className="btn btn-primary">
                Add the video to favorites
              </button>
            }
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
