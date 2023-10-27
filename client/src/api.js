const path = 'http://localhost:3001';

const getUserData = async (token) => {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await response.json();
};

const createPost = async (data) => {
    console.log(data);

    const response = await fetch(`${path}/api/post`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(data),
        })
        .catch(err => {
            throw new Error('Error saving post.');
        });
    return response;
};

const readPosts = async () => {

    const response = await fetch(`${path}/api/posts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .catch(err => {
        throw new Error('Error reading posts.');
    });
    return await response.json();
};

const readPost = async (id) => {

    const response = await fetch(`${path}/api/post/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .catch(err => {
        throw new Error('Error reading posts.');
    });
    return await response.json();
};

const updatePost = async (id, data) => {

    return await fetch(`${path}/api/post/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(data)
    })
};

const deletePost = async (id) => {

    return await fetch(`${path}/api/post/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
};

export {
    getUserData,
    createPost,
    readPosts,
    readPost,
    updatePost,
    deletePost    
};
