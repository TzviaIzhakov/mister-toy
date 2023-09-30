import { userService } from "../../services/user.service.js";
import { SET_USER} from "../reducers/user.reducer.js";
import { CLEAR_TOYS } from "../reducers/toy.reducer.js"; 
import { store } from "../store.js";

export async function login(credentials) {
    try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
    // return userService.login(credentials)
    //     .then(user => {
    //         store.dispatch({ type: SET_USER, user })
    //         return user
    //     })
    //     .catch(err => {
    //         console.log('user actions -> Cannot login', err)

    //         throw err
    //     })
}


export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
    // return userService.signup(credentials)
    //     .then(user => {
    //         store.dispatch({ type: SET_USER, user })
    //         return user
    //     })
    //     .catch(err => {
    //         console.log('user actions -> Cannot signup', err)
    //         throw err
    //     })
}


export async function logout() {
    try {
        await userService.logout();
        store.dispatch({ type: SET_USER, user: null })
        store.dispatch({ type: CLEAR_TOYS });
    } catch (err) {
        console.error('user actions -> Cannot logout:', err)
        throw err
    }
    // return userService.logout()
    //     .then(() => {
    //         store.dispatch({ type: SET_USER, user: null })
    //         store.dispatch({ type: CLEAR_TOYS });
    //     })
    //     .catch(err => {
    //         console.error('user actions -> Cannot logout:', err)
    //         throw err
    //     })
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