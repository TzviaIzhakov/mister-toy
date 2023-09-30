
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'



export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updatebalance
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    // console.log(username, password);
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
    } catch (err) {
        console.log(err);
    }
    // return httpService.post(BASE_URL + 'login', { username, password })
    //     .then(user => {
    //         if (user) return _setLoggedinUser(user)
    //     })
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 10000}
    try {
        const userSignUp = await httpService.post(BASE_URL + 'signup', user)
        if (userSignUp) return _setLoggedinUser(userSignUp)
    } catch (err) {
        console.log(err);
    }
    // return httpService.post(BASE_URL + 'signup', user)
    //     .then(user => {
    //         if (user) return _setLoggedinUser(user)
    //     })

}

async function updatebalance(diff) {
    if (getLoggedinUser().balance + diff < 0) return Promise.reject('No credit')
    try {
        const user = await httpService.put('user', { diff })
        _setLoggedinUser(user)
        return user.balance
    } catch (err) {
     console.log(err);   
    }
    // return httpService.put('user', { diff })
    //     .then(user => {
    //         _setLoggedinUser(user)
    //         return user.balance
    //     })
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log(err);
    }
    // return httpService.post(BASE_URL + 'logout')
    //     .then(() => {
    //         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    //     })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    // console.log(user.isAdmin, "user");
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance,isAdmin: user.isAdmin || false, msgs:[] }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



