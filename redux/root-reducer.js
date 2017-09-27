import { combineReducers } from 'redux'

// Delete this once you have real state:
const name = (state = 'Scroopy Noopers', action) => state

const rootReducer = combineReducers({
  name,
})

export default rootReducer
