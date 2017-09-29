import {
  FETCH_LISTS_AND_TASKS_REQUEST_SENT,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_FAILED,
} from '../../../../action-types'

const isLoading = (state = false, action) => {
  switch (action.type) {
    case FETCH_LISTS_AND_TASKS_REQUEST_SENT:
      return true
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
    case FETCH_LISTS_AND_TASKS_REQUEST_FAILED:
      return false
    default:
      return state
  }
}

export default isLoading
