import isLoading from './index'
import {
  createListRequestFailed,
  createListRequestSent,
  createListRequestSucceded,
  fetchListsAndTasksRequestSent,
  fetchListsAndTasksRequestFailed,
  fetchListsAndTasksRequestSucceeded,
} from '../../../../actions'

describe('lists.isLoading', () => {
  describe('FETCH_LISTS_AND_TASKS_REQUEST_SENT', () => {
    it('indicates that the lists are loading', () => {
      const initialState = false
      const action = fetchListsAndTasksRequestSent()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(true)
    })
  })

  describe('FETCH_LISTS_AND_TASKS_REQUEST_FAILED', () => {
    it('indicates that the lists are no longer loading', () => {
      const initialState = true
      const action = fetchListsAndTasksRequestFailed()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })

  describe('FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED', () => {
    it('indicates that the lists are no longer loading', () => {
      const initialState = true
      const action = fetchListsAndTasksRequestSucceeded({ listsById: {}, tasksById: {} })
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })

  describe('CREATE_LIST_REQUEST_SENT', () => {
    it('indicates that the lists are loading', () => {
      const initialState = false
      const action = createListRequestSent()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(true)
    })
  })

  describe('CREATE_LIST_REQUEST_FAILED', () => {
    it('indicates that the lists are no longer loading', () => {
      const initialState = true
      const action = createListRequestFailed()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })

  describe('CREATE_LIST_REQUEST_SUCCEEDED', () => {
    it('indicates that the lists are no longer loading', () => {
      const initialState = true
      const action = createListRequestSucceded()
      const newState = isLoading(initialState, action)
      expect(newState).toBe(false)
    })
  })
})
