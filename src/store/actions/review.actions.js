import { reviewService } from "../../services/review.service.js"

import { store } from "../store.js";
import { ADD_REVIEW, SET_REVIEWS } from '../reducers/review.reducer.js'
import { toyService } from "../../services/toy.service.js";
// import { SET_SCORE, SET_WATCHED_USER } from './user.reducer'

// Action Creators
// export function getActionRemoveReview(reviewId) {
//   return { type: REMOVE_REVIEW, reviewId }
// }
// export function getActionAddReview(review) {
//   return { type: ADD_REVIEW, review }
// }
// export function getActionSetWatchedUser(user) {
//   return { type: SET_WATCHED_USER, user }
// }

export async function loadReviews(filterBy) {
  try {
    const {loggedinUser} = store.getState().userModule
    console.log(loggedinUser);
    const reviews = await reviewService.query(filterBy)
    console.log(reviews, "revs from action");
    store.dispatch({ type: SET_REVIEWS, reviews })

  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    store.dispatch({ type: ADD_REVIEW, review: addedReview })
    // const { score } = addedReview.byUser
    // store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

// export async function removeReview(reviewId) {
//   try {
//     await reviewService.remove(reviewId)
//     store.dispatch(getActionRemoveReview(reviewId))
//   } catch (err) {
//     console.log('ReviewActions: err in removeReview', err)
//     throw err
//   }
// }