import React, { ChangeEvent, FC, FormEvent } from 'react';

interface PostFormProps {
  handleFormChange: (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
  createPost: (e : FormEvent<HTMLFormElement>) => void
}

const PostForm: FC<PostFormProps> = (props) => {
  return (
    <div>
      <p>Create new post</p>
      <form onSubmit={(e) => props.createPost(e)}>
        <label htmlFor="title">Title</label><br/>
        <input
          id="title"
          name="title"
          type="text"
          onChange={(e) => props.handleFormChange(e)}
        /><br/>
        <label htmlFor="text">Text</label><br/>
        <textarea
          id="text"
          name="text"
          onChange={(e) => props.handleFormChange(e)}
          rows={8}
          cols={50}
        /><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;