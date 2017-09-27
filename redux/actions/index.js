import { UPDATE_NAME } from '../action-types'

export const updateName = (name) => ({
  type: UPDATE_NAME,
  payload: {
    name,
  },
})
