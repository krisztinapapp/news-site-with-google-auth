import React, { useState, useEffect } from 'react';
import Post, { PostProps } from './Post';
import { readPosts } from '../api';

const PostList = () => {
  const [ posts, setPosts ] = useState<PostProps[]>([]);

  useEffect(() => {
    const asyncReadPosts = async () => {
      await readPosts()
        .then((res) => setPosts(res.reverse()))
        .catch((err) => console.log(err));
    }
    asyncReadPosts();
  }, []);

  return (
    <div>
      {posts?.map((post, index) =>
        <Post
          key={index}
          id={post.id}
          user={post.user}
          pictureURL={post.pictureURL}
          title={post.title}
          text={post.text}
        />
      )}
    </div>
  );
}

export default PostList;