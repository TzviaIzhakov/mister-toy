import {toyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY, SET_TOYS_INITIAL, TOY_UNDO } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys() {
    const { filterBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
   try {
   const toys =  await toyService.query(filterBy)
   store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
    console.log('toy action -> Cannot load toys', err)
    throw err
    }
    finally{
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
    
    // return toyService.query(filterBy)
    //     .then(toys => {
    //         store.dispatch({ type: SET_TOYS, toys })
    //     })
    //     .catch(err => {
    //         console.log('toy action -> Cannot load toys', err)
    //         throw err
    //     })
    //     .finally(() => {
    //         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    //     })
}

export function loadToysAll(label,toysInital) {
     let toysLoad = toysInital.filter(toy=>{
       return  toy.labels.includes(label)
    })
     let sum = toysLoad.reduce((acc,toy)=>{
      return acc+toy.price
     },0)
     return sum/toysInital.length
}

export function loadToysByStock(label,toysInital) {
    let toysLoad = toysInital.filter(toy=>{
      return  toy.labels.includes(label)
   })
   let toysByStock  = toysLoad.filter(toy=> toy.inStock)
   return toysByStock.length/toysLoad.length * 100
}

export async function loadInitalToys() {
    try {
        const toys = await toyService.query({})
        store.dispatch({ type: SET_TOYS_INITIAL, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    }
   
    // return toyService.query({})
    // .then(toys => {
    //     store.dispatch({ type: SET_TOYS_INITIAL, toys })
    // })
    // .catch(err => {
    //     console.log('toy action -> Cannot load toys', err)
    //     throw err
    // })
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId);
        store.dispatch({ type: REMOVE_TOY,toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove car', err)
        throw err
    }
    // return toyService.remove(toyId)
    //     .then(() => {
    //         store.dispatch({ type: REMOVE_TOY,toyId })
    //     })
    //     .catch(err => {
    //         console.log('toy action -> Cannot remove car', err)
    //         throw err
    //     })
}

export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    try {
        await toyService.remove(toyId)
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.log('car action -> Cannot remove car', err)
        throw err
    }
    // return toyService.remove(toyId)
    //     .catch(err => {
    //         store.dispatch({ type: TOY_UNDO })
    //         console.log('car action -> Cannot remove car', err)
    //         throw err
    //     })
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy);
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('car action -> Cannot save car', err)
        throw err
    }
    // return toyService.save(toy)
    //     .then(toyToSave => {
    //         store.dispatch({ type, toy: toyToSave })
    //         return toyToSave
    //     })
    //     .catch(err => {
    //         console.log('car action -> Cannot save car', err)
    //         throw err
    //     })
}