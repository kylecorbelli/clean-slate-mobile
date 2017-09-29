import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import { UPDATE_NAME } from '../action-types'
import hasSplashScreenBeenShown from './hasSplashScreenBeenShown'
import entities from './entities'

const rootReducer = combineReducers({
  entities,
  hasSplashScreenBeenShown,
  reduxTokenAuth: reduxTokenAuthReducer,
})

export default rootReducer
