import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB';
const BASE_URL = 'toy/'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered']

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getLabels,
  getDefaultFilter
};

function query(filterBy) {
  console.log("filterBy",filterBy);
  if(filterBy.labels && filterBy.labels.length>0) filterBy = {...filterBy,labels:filterBy.labels.join(',')};
  console.log(filterBy,"after");
  return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
  return  httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    // when switching to backend - remove the next line
    // toy.owner = userService.getLoggedinUser();
    return httpService.post(BASE_URL, toy)
  }
}

function getLabels() {
    return labels
}

function getDefaultFilter(){
  return {name:'', inStock: false, labels:[]} 
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: false,
  };
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
