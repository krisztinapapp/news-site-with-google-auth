const path = 'http://localhost:3001';

const getUserData = async (token) => {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await response.json();
};

const readPosts = async () => {

    const response = await fetch(`${path}/api/readPosts`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return await response.json();
};

const createPost = async (data) => {
    console.log(data);

    const response = await fetch(`${path}/api/createPost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(data),
        })
        .catch(err => {
            throw new Error('Error saving post.');
        });
    return response;
};

/*
const deletePost = async (id) => {

    return await fetch(`${path}/api/deletePost/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
};
*/

export {
    getUserData,
    readPosts,
    createPost,
    //deletePost
};
