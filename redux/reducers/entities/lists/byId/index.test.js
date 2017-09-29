import byId from './index'
import {
  fetchListsAndTasksRequestSent,
  fetchListsAndTasksRequestFailed,
  fetchListsAndTasksRequestSucceeded,
} from '../../../../actions'

describe('lists.byId', () => {
  describe('FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED', () => {
    it('populates and/or overwrites the lists by id', () => {
      const initialState = {}
      const listsById = {
        1: {
          id: 1,
          title: 'test list',
          taskIds: [ 4, 5 ],
        }
      }
      const tasksById = {}
      const action = fetchListsAndTasksRequestSucceeded({ listsById, tasksById })
      const newState = byId(initialState, action)
      expect(newState).toEqual(listsById)
    })
  })
})
