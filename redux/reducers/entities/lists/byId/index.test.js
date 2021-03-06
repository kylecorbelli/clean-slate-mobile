import byId from './index'
import {
  createListRequestSucceded,
  createTaskRequestSucceeded,
  deleteListRequestSucceeded,
  fetchListsAndTasksRequestSucceeded,
  updateListRequestSucceeded,
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

  describe('DELETE_LIST_REQUEST_SUCCEEDED', () => {
    it('removes the list from lists by id', () => {
      const initialState = {
        1: {
          id: 1,
          title: 'first list',
        },
        2: {
          id: 2,
          title: 'second list',
        },
      }
      const action = deleteListRequestSucceeded(2)
      const newState = byId(initialState, action)
      const expectedNewState = {
        1: {
          id: 1,
          title: 'first list',
        },
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('UPDATE_LIST_REQUEST_SUCCEEDED', () => {
    it('updates the title of specified list', () => {
      const updatedListTitle = 'updated second list'
      const initialState = {
        1: {
          id: 1,
          title: 'first list',
        },
        2: {
          id: 2,
          title: 'second list',
        },
      }
      const action = updateListRequestSucceeded(2, { title: updatedListTitle })
      const newState = byId(initialState, action)
      expect(newState[2].title).toBe(updatedListTitle)
    })
  })
})
