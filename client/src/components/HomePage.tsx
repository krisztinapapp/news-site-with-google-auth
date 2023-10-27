import React, { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import PostList from './PostList';
import CreatePost from './CreatePost';
import Profile, { ProfileProps } from './Profile';
import { getUserData } from '../api';

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
                <button onClick={() => handleLogOut()} className="sign-button">Sign out</button>
                <h3>Create new post</h3>
                <CreatePost
                    name={profileData.name}
                    pictureURL={profileData.pictureURL}
                />
                <h3>News</h3>
                <PostList />
            </div>
        ) : (
            <div>
            <button onClick={() => handleLogin()} className="sign-button">Sign in with Google</button>
            </div>
        )}
        </div>
    )
}

export default HomePage;