import { httpService } from './http.service'



export const reviewService = {
  add,
  query,
}

async function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?byUserId=${filterBy.userId}&byToyId=${filterBy.toyId}`
  // console.log(filterBy);
  const revs = await httpService.get(`review`,filterBy)
  console.log("revs in query", revs);
  return revs
  // return storageService.query('review')
}

async function add(review) {
  const addedReview = await httpService.post(`review`, review)
 console.log(addedReview,"addedReview");
  return addedReview
}