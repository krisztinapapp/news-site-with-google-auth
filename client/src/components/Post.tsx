import userEvent from '@testing-library/user-event';
import React, { FC } from 'react';

export interface PostProps {
  user: string,
  pictureURL: string | undefined,
  title: string,
  text: string
}

const Post: FC<PostProps> = (props) => {
  return (
    <div>
      <img src={props.pictureURL} alt="user profile"></img>
      <p><b>{props.user}</b> - props.title</p>
      <p>{props.text}</p>
      <p><i>(Last modified: ?)</i></p>
    </div>
  );
}

export default Post;