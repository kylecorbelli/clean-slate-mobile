import byId from './index'
import {
  createTaskRequestSucceeded,
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

  describe('CREATE_TASK_REQUEST_SUCCEEDED', () => {
    it('adds the new task to tasks by id', () => {
      const initialState = {
        1: {
          id: 1,
          description: 'first task',
        },
      }
      const newTask = {
        id: 2,
        description: 'a new task',
      }
      const action = createTaskRequestSucceeded(newTask)
      const expectedNewState = {
        ...initialState,
        [newTask.id]: newTask,
      }
      const newState = byId(initialState, action)
      expect(newState).toEqual(expectedNewState)
    })
  })
})
