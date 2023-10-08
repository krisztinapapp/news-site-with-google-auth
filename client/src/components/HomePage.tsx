import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import PostList from './PostList';
import CreatePost from './CreatePost';
import Profile, { ProfileProps } from './Profile';
import { getUserData, createPost } from '../api';



const HomePage = () => {
    const [ profileData, setProfileData ] = useState<ProfileProps>({
        name: null,
        pictureURL: undefined
    });
    

    const handleLogin = useGoogleLogin({
        onSuccess: (res) => {
            localStorage.setItem('token', res.access_token);
            window.location.reload();
        },
        onError: (err) => console.log('Error signing in: ', err)
    });

    const handleLogOut = () => {
        googleLogout();
        localStorage.removeItem('token');
        window.location.reload();
    };

    

    useEffect(() => {
        const token: any = localStorage.getItem('token');
        if (token != null && token !== 'undefined') {
            const asyncGetUserData = async () => 
                await getUserData(token.access_token)
                    .then((res) => {
                        setProfileData({
                            name: res.name,
                            pictureURL: res.picture
                        });
                    })
                    .catch((err) => console.log(err));
            asyncGetUserData();
        }
    }, []);

    return (
        <div>
        <h1>News Site</h1>
            {localStorage.getItem('token') != null && localStorage.getItem('token') !== 'undefined' ? (
            <div>
                <Profile name={profileData.name} pictureURL={profileData.pictureURL} />
                <button onClick={() => handleLogOut()}>Sign out</button>
                <h4>Create new post</h4>
                <CreatePost
                    name={profileData.name}
                    pictureURL={profileData.pictureURL}
                />
                <h4>News</h4>
                <PostList />
            </div>
        ) : (
            <div>
            <button onClick={() => handleLogin()}>Sign in with Google</button>
            </div>
        )}
        </div>
    )
}

export default HomePage;