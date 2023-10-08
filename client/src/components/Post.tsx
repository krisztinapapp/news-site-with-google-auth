import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost, updatePost } from '../api';

export interface PostProps {
  id: number,
  user: string,
  pictureURL: string | undefined,
  title: string,
  text: string
}

const Post: FC<PostProps> = (props) => {
  /*const handleEdit = async (id: number) => {
    const response = await updatePost(id)
      .catch((err) => console.log(err));
    console.log(response);
  }*/

  const handleDelete = async (id: number) => {
    const response = await deletePost(id)
      .catch((err) => console.log(err));
      window.location.reload();
  }

  const navigate = useNavigate();

  return (
    <div>
      <img src={props.pictureURL} alt="user profile"></img>
      <p><b>{props.user}</b> - {props.title}</p>
      <p>{props.text}</p>
      <button onClick={() => navigate(`/edit/${props.id}`)}>Edit</button>
      <button onClick={() => handleDelete(props.id)}>Delete</button>
    </div>
  );
}

export default Post;