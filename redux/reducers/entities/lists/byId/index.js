import {
  CREATE_LIST_REQUEST_SUCCEEDED,
  CREATE_TASK_REQUEST_SUCCEEDED,
  DELETE_LIST_REQUEST_SUCCEEDED,
  DELETE_TASK_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  UPDATE_LIST_REQUEST_SUCCEEDED,
} from '../../../../action-types'
import cloneDeep from 'lodash/cloneDeep'

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST_REQUEST_SUCCEEDED:
      const { newList } = action.payload
      return {
        ...state,
        [newList.id]: newList,
      }
    case DELETE_LIST_REQUEST_SUCCEEDED:
      const newState = cloneDeep(state)
      delete newState[action.payload.listId]
      return newState
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
      return action.payload.listsById
    case UPDATE_LIST_REQUEST_SUCCEEDED:
      const { listId, updatedListDetails } = action.payload
      return {
        ...state,
        [listId]: {
          ...state[listId],
          ...updatedListDetails,
        },
      }
    default:
      return state
  }
}

export default byId
