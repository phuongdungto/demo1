import request from '../core/utils/axios';
import cookies from 'react-cookies';

const token = cookies.load('csrftoken');
console.log(token);
const loginService = (user) => {
    const config = {
        headers: { 'X-CSRF-Token': token }
    };

    const bodyParameters = {
        ...user
    };

    return request.post(
        'users/signin',
        bodyParameters,
        config
    )
}

const signupService = (user) => {
    const config = {
        headers: { 'X-CSRF-Token': token }
    };
    delete user.confirmPassword
    const bodyParameters = {
        ...user
    };

    return request.post(
        'users/signup',
        bodyParameters,
        config
    )
}

const getUserService = (id) => {
    return request.get(
        'users/' + id
    )
}

export { loginService, signupService, getUserService }