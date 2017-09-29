import isLoading from './index'
import {
  createTaskRequestFailed,
  createTaskRequestSent,
  createTaskRequestSucceeded,
  fetchListsAndTasksRequestSent,
  fetchListsAndTasksRequestFailed,
  fetchListsAndTasksRequestSucceeded,
} from '../../../../actions'

describe('lists.isLoading', () => {
  describe('FETCH_LISTS_AND_TASKS_REQUEST_SENT', () => {
    it('indicates that the tasks are loading', () => {
      const initialState = false
      const action = fetchListsAndTasksRequestSent()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(true)
    })
  })

  describe('FETCH_LISTS_AND_TASKS_REQUEST_FAILED', () => {
    it('indicates that the tasks are no longer loading', () => {
      const initialState = true
      const action = fetchListsAndTasksRequestFailed()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })

  describe('FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED', () => {
    it('indicates that the tasks are no longer loading', () => {
      const initialState = true
      const action = fetchListsAndTasksRequestSucceeded({ listsById: {}, tasksById: {} })
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })

  describe('CREATE_TASK_REQUEST_SENT', () => {
    it('indicates that the tasks are loading', () => {
      const initialState = false
      const action = createTaskRequestSent()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(true)
    })
  })

  describe('CREATE_TASK_REQUEST_FAILED', () => {
    it('indicates that the tasks are no longer loading', () => {
      const initialState = true
      const action = createTaskRequestFailed()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })

  describe('CREATE_TASK_REQUEST_SUCCEEDED', () => {
    it('indicates that the tasks are no longer loading', () => {
      const initialState = true
      const action = createTaskRequestSucceeded()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })
})
