import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const CLEAR_TOYS = 'CLEAR_TOYS'

export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_TOYS_INITIAL = "SET_TOYS_INITIAL"
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const TOY_UNDO = 'TOY_UNDO'

const initialState = {
    toys: [],
    lastToys: [],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,
    toysInitial: []
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    let lastToys
    switch (action.type) {
        // Cars
        case SET_TOYS:
            lastToys = [...action.toys]
            return { ...state, toys: action.toys, lastToys}

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            console.log(toys,"oo");
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case TOY_UNDO:
            toys = [...state.lastToys]
            return { ...state, toys }

        case SET_FILTER_BY:
            return { ...state, filterBy: {...action.filterBy} }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_TOYS_INITIAL:
            return { ...state, toysInitial: action.toys}
        
        case CLEAR_TOYS:
            return { ...state, toys: [] };
        default:
            return state;
    }
}