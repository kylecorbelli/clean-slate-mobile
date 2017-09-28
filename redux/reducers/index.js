import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import { UPDATE_NAME } from '../action-types'
import hasSplashScreenBeenShown from './hasSplashScreenBeenShown'

const rootReducer = combineReducers({
  hasSplashScreenBeenShown,
  reduxTokenAuth: reduxTokenAuthReducer,
})

export default rootReducer
