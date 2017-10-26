import isLoading from './index'
import { expectLoadingStateToChangeTo } from '../../../../../services/test-helpers'
import {
  createImageRequestSent,
  createImageRequestFailed,
  createImageRequestSucceeded,
  deleteImageRequestSent,
  deleteImageRequestSucceeded,
  deleteImageRequestFailed,
} from '../../../../actions'

describe('images/isLoading', () => {
  describe('CREATE_IMAGE_REQUEST_SENT', () => {
    it('indicates that images are loading', () => {
      expectLoadingStateToChangeTo(true, deleteImageRequestSent, isLoading)
    })
  })

  describe('CREATE_IMAGE_REQUEST_FAILED', () => {
    it('indicates that images are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteImageRequestSucceeded, isLoading)
    })
  })

  describe('CREATE_IMAGE_REQUEST_SUCCEEDED', () => {
    it('indicates that images are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteImageRequestFailed, isLoading)
    })
  })

  describe('DELETE_IMAGE_REQUEST_SENT', () => {
    it('indicates that images are loading', () => {
      expectLoadingStateToChangeTo(true, deleteImageRequestSent, isLoading)
    })
  })

  describe('DELETE_IMAGE_REQUEST_FAILED', () => {
    it('indicates that images are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteImageRequestSucceeded, isLoading)
    })
  })

  describe('DELETE_IMAGE_REQUEST_SUCCEEDED', () => {
    it('indicates that images are no longer loading', () => {
      expectLoadingStateToChangeTo(false, deleteImageRequestFailed, isLoading)
    })
  })
})
