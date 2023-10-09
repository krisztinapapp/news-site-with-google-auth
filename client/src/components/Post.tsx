import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../api';

export interface PostProps {
  id: number,
  user: string,
  pictureURL: string | undefined,
  title: string,
  text: string
}

const Post: FC<PostProps> = (props) => {

  const handleDelete = async (id: number) => {
    await deletePost(id)
      .catch((err) => console.log(err));
      window.location.reload();
  }

  const navigate = useNavigate();

  return (
    <div className="post-div">
      <img src={props.pictureURL} alt="user profile" className="post-pic"></img>
      <p><b>{props.user}</b> - {props.title}</p>
      <p>{props.text}</p>
      <button onClick={() => navigate(`/edit/${props.id}`)}>Edit</button>
      <button onClick={() => handleDelete(props.id)}>Delete</button>
    </div>
  );
}

export default Post;