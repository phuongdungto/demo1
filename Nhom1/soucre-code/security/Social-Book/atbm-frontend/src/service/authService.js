import request from '../core/utils/axios';

const loginService = (user) => {

    const bodyParameters = {
        ...user
    };

    return request.post(
        'users/signin',
        bodyParameters
    )
}

const signupService = (user) => {
    delete user.confirmPassword
    const bodyParameters = {
        ...user
    };

    return request.post(
        'users/signup',
        bodyParameters
    )
}

const getUserService = (id) => {

    return request.get(
        'users/' + id
    )
}

export { loginService, signupService, getUserService }