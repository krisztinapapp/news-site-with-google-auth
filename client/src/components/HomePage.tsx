import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import PostList from './PostList';
import PostForm from './PostForm';
import Profile, { ProfileProps } from './Profile';
import { getUserData, createPost } from '../api';

interface PostFormState {
    title: string | null,
    text: string | null
}

const HomePage = () => {
    const [ profileData, setProfileData ] = useState<ProfileProps>({
        name: null,
        pictureURL: undefined
    });
    const [ values, setValues ] = useState<PostFormState>({
        title: null,
        text: null
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

    const handleFormChange = (e : ChangeEvent<HTMLInputElement>  | ChangeEvent<HTMLTextAreaElement>) => {
        setValues({...values, [e.target.name] : e.target.value});
    }

    const handleCreatePost = async (e : FormEvent<HTMLFormElement>) => {
        const newPost = await createPost({
            user: profileData.name,
            pictureURL: profileData.pictureURL,
            title: values.title,
            text: values.text
        }).catch((err) => console.log(err)
        );
        console.log(newPost);
    }

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
                <PostForm handleFormChange={handleFormChange} createPost={handleCreatePost}/>
                <PostList />
                <button onClick={() => handleLogOut()}>Sign out</button>
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