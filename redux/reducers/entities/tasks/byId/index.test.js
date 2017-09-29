import byId from './index'
import {
  fetchListsAndTasksRequestSent,
  fetchListsAndTasksRequestFailed,
  fetchListsAndTasksRequestSucceeded,
} from '../../../../actions'

describe('lists.byId', () => {
  describe('FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED', () => {
    it('populates and/or overwrites the tasks by id', () => {
      const initialState = {}
      const tasksById = {
        1: {
          id: 1,
          description: 'test this reducer',
          isDone: true,
        }
      }
      const listsById = {}
      const action = fetchListsAndTasksRequestSucceeded({ listsById, tasksById })
      const newState = byId(initialState, action)
      expect(newState).toEqual(tasksById)
    })
  })
})
