import {
  CREATE_LIST_REQUEST_FAILED,
  CREATE_LIST_REQUEST_SENT,
  CREATE_LIST_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_SENT,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_FAILED,
} from '../../../../action-types'

const isLoading = (state = false, action) => {
  switch (action.type) {
    case CREATE_LIST_REQUEST_SENT:
    case FETCH_LISTS_AND_TASKS_REQUEST_SENT:
      return true
    case CREATE_LIST_REQUEST_FAILED:
    case CREATE_LIST_REQUEST_SUCCEEDED:
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
    case FETCH_LISTS_AND_TASKS_REQUEST_FAILED:
      return false
    default:
      return state
  }
}

export default isLoading
