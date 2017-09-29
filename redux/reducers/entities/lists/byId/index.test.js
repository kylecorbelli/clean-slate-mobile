import byId from './index'
import {
  createListRequestSucceded,
  createTaskRequestSucceeded,
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

  describe('CREATE_LIST_REQUEST_SUCCEEDED', () => {
    it('adds the new list to lists by id', () => {
      const initialState = {
        1: {
          id: 1,
          title: 'first list',
          taskIds: [ 1, 2 ],
        },
      }
      const newList = {
        id: 2,
        title: 'a new list',
        taskIds: [ 3, 4 ],
      }
      const action = createListRequestSucceded(newList)
      const newState = byId(initialState, action)
      const expectedNewState = {
        ...initialState,
        [newList.id]: newList,
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('CREATE_TASK_REQUEST_SUCCEEDED', () => {
    it('adds the new task’s ID to the correponsing list', () => {
      const initialState = {
        1: {
          id: 1,
          title: 'first list',
          taskIds: [ 1, 2 ],
        },
        2: {
          id: 2,
          title: 'second list',
          taskIds: [ 3 ],
        },
      }
      const newTask = {
        id: 4,
        description: 'a new task',
        isDone: false,
      }
      const action = createTaskRequestSucceeded(newTask, 2)
      const expectedNewState = {
        1: {
          id: 1,
          title: 'first list',
          taskIds: [ 1, 2 ],
        },
        2: {
          id: 2,
          title: 'second list',
          taskIds: [ 3, 4 ],
        },
      }
      const newState = byId(initialState, action)
      expect(newState).toEqual(expectedNewState)
    })
  })
})
