import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = () => ({type: actionTypes.AUTH_START})
export const authSuccess = token => ({type: actionTypes.AUTH_SUCCESS, token})
export const authFail = error => ({type: actionTypes.AUTH_FAIL, error})
export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {type: actionTypes.AUTH_LOGOUT}
}
const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}
export const authLogin = (username, password) => {
    
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/auth/token/login/', {
            username,
            password,
        })
        .then(response => {
            const token = response.data.auth_token
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeOut(3600))
        })
        .catch(error => dispatch(authFail(error)))
    }
}


export const authSignUp = (username, email, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/api/v1/auth/users/', {
            username,
            email, 
            password,
        })
        .then(response => {
            const token = response.data.auth_token
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeOut(3600))
        })
        .catch(error => dispatch(authFail(error)))
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (token === null) {
            dispatch(authLogout())
        } else {
            const expirationDate = localStorage.getItem('expirationDate')
            if (expirationDate <= Date.now()) {
                dispatch(authLogout())
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeOut(3600))
            }
        }
    }
}

