import { AsyncStorage } from 'react-native'
import { UPDATE_NAME } from '../action-types'

export const updateName = (name) => ({
  type: UPDATE_NAME,
  payload: {
    name,
  },
})

export const persistName = (name) => {
  return async function (dispatch) {
    await AsyncStorage.setItem('name', name)
    dispatch(updateName(name))
  }
}
