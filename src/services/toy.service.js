import { storageService } from './async-storage.service.js';

const STORAGE_KEY = 'toyDB';

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
  return storageService.query(STORAGE_KEY).then((toys) => {
    const regExp = new RegExp(filterBy.name, 'i');
  
    if (filterBy.name!=='') {
      toys = toys.filter((toy) => regExp.test(toy.name));
    }
    if (filterBy.inStock) {
      toys = toys.filter((toy) => toy.inStock);
    }
    if (filterBy.labels.length) {
     toys = toys.filter(toy=>filterBy.labels.includes(toy.labels))
    }
    return toys;
  });
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId);
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId);
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy);
  } else {
    // when switching to backend - remove the next line
    // toy.owner = userService.getLoggedinUser();
    return storageService.post(STORAGE_KEY, toy);
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
