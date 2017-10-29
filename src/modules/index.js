import { combineReducers } from 'redux'
import { default as bookReducer } from './BookModule'

export default combineReducers({
  books: bookReducer
})