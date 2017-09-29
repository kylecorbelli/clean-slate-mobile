import {
  CREATE_TASK_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
} from '../../../../action-types'

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST_SUCCEEDED:
      const { newTask } = action.payload
      return {
        ...state,
        [newTask.id]: newTask,
      }
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
      return action.payload.tasksById
    default:
      return state
  }
}

export default byId
