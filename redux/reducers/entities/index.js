import { combineReducers } from 'redux'

import lists from './lists'
import tasks from './tasks'
import images from './images'

export default combineReducers({
  images,
  lists,
  tasks,
})
