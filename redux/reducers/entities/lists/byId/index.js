import { FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED } from '../../../../action-types'

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
      return action.payload.listsById
    default:
      return state
  }
}

export default byId
