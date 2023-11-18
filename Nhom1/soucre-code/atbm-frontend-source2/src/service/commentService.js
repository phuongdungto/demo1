import request from '../core/utils/axios';

import cookies from 'react-cookies';

const token = cookies.load('csrftoken');
const getListCommentService = async (comment) => {

    let s = '';
    if (comment.limit) {
        s += '?limit=' + comment.limit + '';
    } else {
        s += '?limit=10';
    }
    if (comment.page) {
        s += '&page=' + comment.page + '';
    }
    if (comment.postId && comment.postId !== '') {
        s += '&postId=' + comment.postId + '';
    }
    if (comment.sortBy) {
        s += '&sortBy=' + comment.sortBy + '';
    }
    if (comment.sort) {
        s += '&sort=' + comment.sort + '';
    }

    return await request.get(
        'comments' + s
    )
}

const createComment = async (comment) => {
    const config = {
        headers: { 'X-CSRF-Token': token }
    };
    return await request.post(
        'comments',
        comment,
        config
    )
}

export { getListCommentService, createComment }