import request from '../core/utils/axios';
import cookies from 'react-cookies';

const token = cookies.load('csrftoken');
const getListPostService = async (post) => {

    let s = '';
    if (post.limit) {
        s += '?limit=' + post.limit + '';
    } else {
        s += '?limit=10';
    }
    if (post.page) {
        s += '&page=' + post.page + '';
    }
    if (post.userId && post.userId !== '') {
        s += '&userId=' + post.userId + '';
    }
    if (post.sortBy) {
        s += '&sortBy=' + post.sortBy + '';
    }
    if (post.sort) {
        s += '&sort=' + post.sort + '';
    }

    return await request.get(
        'posts' + s
    )
}

const getPost = (id) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };


    return request.get(
        'posts/' + id
    )
}

const createPost = async (post) => {
    const config = {
        headers: { "Content-Type": "multipart/form-data", 'X-CSRF-Token': token }
    };
    return await request.post(
        'posts',
        post,
        config
    )
}

const deletePost = async (post) => {
    const config = {
        headers: { 'X-CSRF-Token': token }
    };
    return await request.delete(
        'posts/' + post,
        config
    ).then(data => console.log(data))
        .catch(error => console.log(error))
}

export { getListPostService, getPost, createPost, deletePost }