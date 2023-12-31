import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { readPost, updatePost } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

interface EditPostType {
  title: string,
  text: string
}

const EditPost = () => {
  const { id } = useParams();

  const [ values, setValues ] = useState<EditPostType>({
    title: "",
    text: ""
  });

  const navigate = useNavigate();

  const handleFormChange = (e : ChangeEvent<HTMLInputElement>  | ChangeEvent<HTMLTextAreaElement>) => {
    setValues({...values, [e.target.name] : e.target.value});
  }

  const handleEditPost = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEdit = await updatePost(id, {
      title: values.title,
      text: values.text
    }).catch((err) => console.log(err));
    console.log(newEdit);
    navigate('/');
  }

  useEffect(() => {
    const asyncReadPost = async () => {
      const res = await readPost(id)
      setValues({
        title: res.title,
        text: res.text
      });
    }
    asyncReadPost();
  }, []);

  return (
    <div>
      <h3>Edit post</h3>
      <form onSubmit={(e) => handleEditPost(e)}>
        <label htmlFor="title">Title</label><br/>
        <input
          id="title"
          name="title"
          type="text"
          onChange={(e) => handleFormChange(e)}
          value={values.title}
        /><br/>
        <label htmlFor="text">Text</label><br/>
        <textarea
          id="text"
          name="text"
          onChange={(e) => handleFormChange(e)}
          value={values.text}
          rows={8}
          cols={50}
        /><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditPost;