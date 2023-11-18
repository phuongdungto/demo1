import request from '../core/utils/axios';

const getListPostService = async (post) => {
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

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

const createPost = (post, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return request.post(
        'posts',
        post,
        config
    )
}

const deletePost = async (post, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await request.delete(
        'posts/' + post,
        config
    ).then(data => console.log(data))
        .catch(error => console.log(error))
}

export { getListPostService, getPost, createPost, deletePost }