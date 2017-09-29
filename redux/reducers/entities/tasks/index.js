import { combineReducers } from 'redux'
import byId from './byId'
import isLoading from './isLoading'

export default combineReducers({
  byId,
  isLoading,
})
