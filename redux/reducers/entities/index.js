import { combineReducers } from 'redux'

import lists from './lists'
import tasks from './tasks'

export default combineReducers({
  lists,
  tasks,
})
