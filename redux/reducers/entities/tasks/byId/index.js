import {
  CREATE_TASK_REQUEST_SUCCEEDED,
  DELETE_TASK_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  UPDATE_TASK_REQUEST_SUCCEEDED,
} from '../../../../action-types'
import cloneDeep from 'lodash/cloneDeep'

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST_SUCCEEDED:
      const { newTask } = action.payload
      return {
        ...state,
        [newTask.id]: newTask,
      }
    case DELETE_TASK_REQUEST_SUCCEEDED:
      const newState = cloneDeep(state)
      delete newState[action.payload.taskId]
      return newState
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
      return action.payload.tasksById
    case UPDATE_TASK_REQUEST_SUCCEEDED:
      const { taskId, updatedTaskDetails } = action.payload
      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          ...updatedTaskDetails,
        },
      }
    default:
      return state
  }
}

export default byId
