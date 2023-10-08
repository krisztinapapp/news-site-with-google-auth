import React, { useState, useEffect } from 'react';
import Post, { PostProps } from './Post';
import { readPosts } from '../api';

const PostList = () => {
  const [ posts, setPosts ] = useState<PostProps[]>([]);

  useEffect(() => {
    const asyncReadPosts = async () => {
      const response = await readPosts()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log(response);
      console.log("Read posts.");
      
    }
        /*.then((res) => {
          console.log(res);
          //setPosts(res);
        })
        .catch((err) => console.log(err));
        */

    asyncReadPosts();
  }, []);

  return (
    <div>
      {posts?.map((post, index) =>
        <Post 
          key={index}
          user={post.user}
          pictureURL={post.pictureURL}
          title={post.title}
          text={post.text}
        />
      )}
      {posts ? (<h1>There are posts</h1>) : (<></>)}
    </div>
  );
}

export default PostList;