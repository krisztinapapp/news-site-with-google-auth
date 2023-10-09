import React, { FC } from 'react';

export interface ProfileProps {
    name: string | null,
    pictureURL: string | undefined
}

const Profile: FC<ProfileProps> = (props) => {
  return (
    <div>
      <img src={props.pictureURL} alt="user profile" className="profile-pic"></img>
      <h2>{props.name}</h2>
    </div>
  );
}

export default Profile;