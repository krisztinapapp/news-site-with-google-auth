import React, { FC } from 'react';

export interface ProfileProps {
    name: string | null,
    pictureURL: string | undefined
}

const Profile: FC<ProfileProps> = (props) => {
  return (
    <div>
      <img src={props.pictureURL} alt="user profile"></img>
      <h3>{props.name}</h3>
    </div>
  );
}

export default Profile;