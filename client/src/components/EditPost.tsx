import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { readPost, updatePost } from '../api';
import { useParams } from 'react-router-dom';

interface EditPostType {
  title: string,
  text: string
}

const EditPost = () => {
  const { id } = useParams();
  const [ postData, setPostData ] = useState({
    title: "",
    text: ""
  });

  useEffect(() => {
    const asyncReadPost = async (id: number) => {
      await readPost(id)
        .then((res) => setPostData(res))
        .catch((err) => console.log(err));
    }
    asyncReadPost(Number(id));
  }, []);

  const [ values, setValues ] = useState<EditPostType>({
    title: postData.title,
    text: postData.text
  });

  const handleFormChange = (e : ChangeEvent<HTMLInputElement>  | ChangeEvent<HTMLTextAreaElement>) => {
    setValues({...values, [e.target.name] : e.target.value});
  }

  const handleEditPost = async (e : FormEvent<HTMLFormElement>) => {
      const newEdit = await updatePost({
          title: values.title,
          text: values.text
      }).catch((err) => console.log(err));
      console.log(newEdit);
  }

  return (
    <div>
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