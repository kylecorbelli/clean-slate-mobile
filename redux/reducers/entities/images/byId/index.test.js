import byId from './index'
import {
  cloudinaryRequestFailed,
  createImageRequestFailed,
  createImageRequestSucceeded,
  optimisticallyAddImage,
  optimisticallyDeleteImage,
  deleteImageRequestFailed,
  deleteImageRequestSucceeded,
} from '../../../../actions'

const undoesOptimisticImageAdd = (actionType, actionCreator) => {
  describe(actionType, () => {
    it('removes the optimistally added image', () => {
      const temporaryImageId = 'temp-1234567890'
      const initialState = {
        1: {
          id: 1,
          url: 'http://oneurl.com',
        },
        [temporaryImageId]: {
          id: temporaryImageId,
          url: 'http://twourl.com',
        },
      }
      const action = actionCreator(temporaryImageId)
      const newState = byId(initialState, action)
      const expectedNewState = {
        1: {
          id: 1,
          url: 'http://oneurl.com',
        },
      }
      expect(newState).toEqual(expectedNewState)
    })
  })
}

describe('images.byId', () => {
  describe('OPTIMISTICALLY_ADD_IMAGE', () => {

  })

  undoesOptimisticImageAdd('CLOUDINARY_REQUEST_FAILED', cloudinaryRequestFailed)
  undoesOptimisticImageAdd('CREATE_IMAGE_REQUEST_FAILED', createImageRequestFailed)

  describe('CREATE_IMAGE_REQUEST_SUCCEEDED', () => {
    it('backfills the temporary ID for the optimistically added image', () => {
      const temporaryImageId = 'temp-1234567890'
      const initialState = {
        1: {
          id: 1,
          url: 'http://oneurl.com',
        },
        [temporaryImageId]: {
          id: temporaryImageId,
          url: '/storage/folder/image.jpeg',
        },
      }
      const permanentImage = {
        id: 2,
        url: 'http://twourl.com',
      }
      const action = createImageRequestSucceeded(temporaryImageId, permanentImage)
      const newState = byId(initialState, action)
      const expectedNewState = {
        1: {
          id: 1,
          url: 'http://oneurl.com',
        },
        2: {
          id: 2,
          url: 'http://twourl.com',
        },
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('OPTIMISTICALLY_DELETE_IMAGE', () => {
    it('removes the targeted image and creates a temporary copy of that image', () => {
      const initialState = {
        1: {
          id: 1,
          taskId: 10,
        },
        2: {
          id: 2,
          taskId: 10,
        },
      }
      const temporaryImageCopyId = `temp-${new Date().valueOf()}`
      const action = optimisticallyDeleteImage(2, temporaryImageCopyId)
      const newState = byId(initialState, action)
      const expectedNewState = {
        1: {
          id: 1,
          taskId: 10,
        },
        [temporaryImageCopyId]: {
          id: temporaryImageCopyId,
          taskId: null,
          originalTaskId: 10,
        },
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('DELETE_IMAGE_REQUEST_FAILED', () => {
    it('copies the copy back to the original image id and removes the first, temporary, copy', () => {
      const temporaryImageCopyId = `temp-${new Date().valueOf()}`
      const initialState = {
        1: {
          id: 1,
          taskId: 10,
        },
        [temporaryImageCopyId]: {
          id: temporaryImageCopyId,
          taskId: null,
          originalTaskId: 10,
        },
      }
      const action = deleteImageRequestFailed(2, temporaryImageCopyId)
      const newState = byId(initialState, action)
      const expectedNewState = {
        1: {
          id: 1,
          taskId: 10,
        },
        2: {
          id: 2,
          taskId: 10,
        },
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('DELETE_IMAGE_REQUEST_SUCCEEDED', () => {
    it('clears out the temporary copy of the deleted image', () => {
      const temporaryImageCopyId = `temp-${new Date().valueOf()}`
      const initialState = {
        1: {
          id: 1,
          taskId: 10,
        },
        [temporaryImageCopyId]: {
          id: temporaryImageCopyId,
          taskId: null,
          originalTaskId: 10,
        },
      }
      const action = deleteImageRequestSucceeded(temporaryImageCopyId)
      const newState = byId(initialState, action)
      const expectedNewState = {
        1: {
          id: 1,
          taskId: 10,
        },
      }
      expect(newState).toEqual(expectedNewState)
    })
  })
})
