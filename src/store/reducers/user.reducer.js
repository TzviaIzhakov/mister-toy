import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_USER_BALANCE:
            const user = { ...state.loggedinUser, balance: action.balance }
            return { ...state, loggedinUser: user }

        default:
            return state;
    }
}