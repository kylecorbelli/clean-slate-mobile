import {
  CREATE_LIST_REQUEST_SUCCEEDED,
  CREATE_TASK_REQUEST_SUCCEEDED,
  DELETE_TASK_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
} from '../../../../action-types'

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LIST_REQUEST_SUCCEEDED:
      const { newList } = action.payload
      return {
        ...state,
        [newList.id]: newList,
      }
    case CREATE_TASK_REQUEST_SUCCEEDED:
      const {
        listId,
        newTask: {
          id: newTaskId,
        },
      } = action.payload
      const targetList = state[listId]
      return {
        ...state,
        [listId]: {
          ...targetList,
          taskIds: [
            ...targetList.taskIds,
            newTaskId,
          ],
        },
      }
    case DELETE_TASK_REQUEST_SUCCEEDED:
      const { taskId } = action.payload
      const listContainingTask = Object.keys(state)
        .map(listId => state[listId])
        .find(list => list.taskIds.indexOf(taskId) !== -1)
      return {
        ...state,
        [listContainingTask.id]: {
          ...listContainingTask,
          taskIds: listContainingTask.taskIds.filter(id => id !== taskId)
        }
      }
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
      return action.payload.listsById
    default:
      return state
  }
}

export default byId
