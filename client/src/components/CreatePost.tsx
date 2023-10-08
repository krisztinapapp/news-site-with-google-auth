import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { createPost } from '../api';

interface CreatePostState {
  title: string | undefined,
  text: string | null
}

interface CreatePostProps {
  name: string | null,
  pictureURL: string | undefined
}

const CreatePost: FC<CreatePostProps> = (props) => {
  const [ values, setValues ] = useState<CreatePostState>({
    title: undefined,
    text: null
  });

  const handleFormChange = (e : ChangeEvent<HTMLInputElement>  | ChangeEvent<HTMLTextAreaElement>) => {
    setValues({...values, [e.target.name] : e.target.value});
  }

  const handleCreatePost = async (e : FormEvent<HTMLFormElement>) => {
      const newPost = await createPost({
          user: props.name,
          pictureURL: props.pictureURL,
          title: values.title,
          text: values.text
      }).catch((err) => console.log(err));
      console.log(newPost);
  }

  return (
    <div>
      <form onSubmit={(e) => handleCreatePost(e)}>
        <label htmlFor="title">Title</label><br/>
        <input
          id="title"
          name="title"
          type="text"
          onChange={(e) => handleFormChange(e)}
        /><br/>
        <label htmlFor="text">Text</label><br/>
        <textarea
          id="text"
          name="text"
          onChange={(e) => handleFormChange(e)}
          rows={8}
          cols={50}
        /><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;