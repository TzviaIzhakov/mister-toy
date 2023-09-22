import {toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY, SET_TOYS_INITIAL } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    const { filterBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function loadToysAll(label,toysInital) {
   console.log(toysInital,"toysInital");
     let toysLoad = toysInital.filter(toy=>{
       return  toy.labels.includes(label)
    })
     let sum = toysLoad.reduce((acc,toy)=>{
      return acc+toy.price
     },0)
     return sum/toysInital.length
}


export function loadInitalToys() {
    return toyService.query({})
    .then(toys => {
        store.dispatch({ type: SET_TOYS_INITIAL, toys })
    })
    .catch(err => {
        console.log('toy action -> Cannot load toys', err)
        throw err
    })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY,toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove car', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: CAR_UNDO })
            console.log('car action -> Cannot remove car', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('car action -> Cannot save car', err)
            throw err
        })
}