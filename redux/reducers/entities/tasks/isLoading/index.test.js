import isLoading from './index'
import {
  createTaskRequestFailed,
  createTaskRequestSent,
  createTaskRequestSucceeded,
  deleteTaskRequestFailed,
  deleteTaskRequestSent,
  deleteTaskRequestSucceeded,
  fetchListsAndTasksRequestSent,
  fetchListsAndTasksRequestFailed,
  fetchListsAndTasksRequestSucceeded,
  updateTaskRequestFailed,
  updateTaskRequestSent,
  updateTaskRequestSucceeded,
} from '../../../../actions'
import { expectLoadingStateToChangeTo } from '../../../../../services/test-helpers'

describe('lists.isLoading', () => {
  describe('FETCH_LISTS_AND_TASKS_REQUEST_SENT', () => {
    it('indicates that the tasks are loading', () => {
      expectLoadingStateToChangeTo(true, fetchListsAndTasksRequestSent, isLoading)
    })
  })

  describe('FETCH_LISTS_AND_TASKS_REQUEST_FAILED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, fetchListsAndTasksRequestFailed, isLoading)
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
      expectLoadingStateToChangeTo(true, createTaskRequestSent, isLoading)
    })
  })

  describe('CREATE_TASK_REQUEST_FAILED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, createTaskRequestFailed, isLoading)
    })
  })

  describe('CREATE_TASK_REQUEST_SUCCEEDED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, createTaskRequestSucceeded, isLoading)
    })
  })

  describe('DELETE_TASK_REQUEST_SENT', () => {
    it('indicates that the tasks are loading', () => {
      expectLoadingStateToChangeTo(true, deleteTaskRequestSent, isLoading)
    })
  })

  describe('DELETE_TASK_REQUEST_FAILED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteTaskRequestFailed, isLoading)
    })
  })

  describe('DELETE_TASK_REQUEST_SUCCEEDED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteTaskRequestSucceeded, isLoading)
    })
  })

  describe('UPDATE_TASK_REQUEST_SENT', () => {
    it('indicates that the tasks are loading', () => {
      expectLoadingStateToChangeTo(true, updateTaskRequestSent, isLoading)
    })
  })

  describe('UPDAT_TASK_REQUEST_FAILED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, updateTaskRequestFailed, isLoading)
    })
  })

  describe('UPDAT_TASK_REQUEST_SUCCEDED', () => {
    it('indicates that the tasks are no longer loading', () => {
      expectLoadingStateToChangeTo(false, updateTaskRequestSucceeded, isLoading)
    })
  })
})
