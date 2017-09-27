import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools'
import initialState from './initial-state'
import rootReducer from './reducers'

// NOTE! To view Redux devtools: visit http://remotedev.io/local/

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  )
}

export default configureStore
