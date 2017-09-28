import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import { UPDATE_NAME } from '../action-types'

// Delete this once you have real state:
const name = (state = 'Scroopy Noopers', action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return action.payload.name
    default:
      return state
  }
}

const rootReducer = combineReducers({
  name,
  reduxTokenAuth: reduxTokenAuthReducer,
})

export default rootReducer
