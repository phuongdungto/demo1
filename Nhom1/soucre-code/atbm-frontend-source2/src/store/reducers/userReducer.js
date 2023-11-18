import cookies from 'react-cookies'
// let user = null
// if (cookies.load('user')) {
//     user = JSON.parse(cookies.load('user'))
// }
const initState = {
    user: cookies.load('user')
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "USER_LOGOUT":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer