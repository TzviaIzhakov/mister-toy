import { userService } from "../../services/user.service.js";
import { SET_USER} from "../reducers/user.reducer.js";
import { CLEAR_TOYS } from "../reducers/toy.reducer.js"; 
import { store } from "../store.js";

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
            store.dispatch({ type: CLEAR_TOYS });
        })
        .catch(err => {
            console.error('user actions -> Cannot logout:', err)
            throw err
        })
}


// export function checkout(diff) {
//     return userService.updateScore(diff)
//         .then(newScore => {
//             store.dispatch({ type: CLEAR_CART })
//             store.dispatch({ type: SET_USER_BALANCE, score: newScore })
//         })
//         .catch(err => {
//             console.error('user actions -> Cannot checkout:', err)
//             throw err
//         })
// }