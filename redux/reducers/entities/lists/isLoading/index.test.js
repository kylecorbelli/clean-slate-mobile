import isLoading from './index'
import {
  createListRequestFailed,
  createListRequestSent,
  createListRequestSucceded,
  deleteListRequestFailed,
  deleteListRequestSent,
  deleteListRequestSucceeded,
  fetchListsAndTasksRequestSent,
  fetchListsAndTasksRequestFailed,
  fetchListsAndTasksRequestSucceeded,
  updateListRequestSent,
  updateListRequestFailed,
  updateListRequestSucceeded,
} from '../../../../actions'
import { expectLoadingStateToChangeTo } from '../../../../../services/test-helpers'

describe('lists.isLoading', () => {
  describe('FETCH_LISTS_AND_TASKS_REQUEST_SENT', () => {
    it('indicates that the lists are loading', () => {
      expectLoadingStateToChangeTo(true, fetchListsAndTasksRequestSent, isLoading)
    })
  })

  describe('FETCH_LISTS_AND_TASKS_REQUEST_FAILED', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, fetchListsAndTasksRequestFailed, isLoading)
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
      expectLoadingStateToChangeTo(true, createListRequestSent, isLoading)
    })
  })

  describe('CREATE_LIST_REQUEST_FAILED', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, createListRequestFailed, isLoading)
    })
  })

  describe('CREATE_LIST_REQUEST_SUCCEEDED', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, createListRequestSucceded, isLoading)
    })
  })

  describe('DELETE_LIST_REQUEST_SENT', () => {
    it('indicates that the lists are loading', () => {
      expectLoadingStateToChangeTo(true, deleteListRequestSent, isLoading)
    })
  })

  describe('DELETE_LIST_REQUEST_FAILED', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteListRequestFailed, isLoading)
    })
  })

  describe('DELETE_LIST_REQUEST_SUCCEDED', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteListRequestSucceeded, isLoading)
    })
  })

  describe('UPDATE_LIST_REQUEST_SENT', () => {
    it('indicates that the lists are loading', () => {
      expectLoadingStateToChangeTo(true, updateListRequestSent, isLoading)
    })
  })

  describe('UPDATE_LIST_REQUEST_FAILED', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, updateListRequestFailed, isLoading)
    })
  })

  describe('UPDATE_LIST_REQUEST_SENT', () => {
    it('indicates that the lists are no longer loading', () => {
      expectLoadingStateToChangeTo(false, updateListRequestSucceeded, isLoading)
    })
  })
})
