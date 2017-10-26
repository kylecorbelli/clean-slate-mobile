import {
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  OPTIMISTICALLY_ADD_IMAGE,
  CLOUDINARY_REQUEST_FAILED,
  CREATE_IMAGE_REQUEST_FAILED,
  CREATE_IMAGE_REQUEST_SUCCEEDED,
  DELETE_IMAGE_REQUEST_FAILED,
  DELETE_IMAGE_REQUEST_SUCCEEDED,
  OPTIMISTICALLY_DELETE_IMAGE,
} from '../../../../action-types'

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED:
      return action.payload.imagesById
    case OPTIMISTICALLY_ADD_IMAGE:
      const { temporaryImage } = action.payload
      return {
        ...state,
        [action.payload.temporaryImage.id]: temporaryImage,
      }
    case CLOUDINARY_REQUEST_FAILED:
    case CREATE_IMAGE_REQUEST_FAILED:
      const { [action.payload.temporaryImageId]: targetImage, ...byIdWithoutTargetImage } = state
      return byIdWithoutTargetImage
    case CREATE_IMAGE_REQUEST_SUCCEEDED:
      const { temporaryImageId, permanentImage } = action.payload
      const { [temporaryImageId]: targetTemporaryImage, ...byIdWithoutTemporaryImage } = state
      return {
        ...byIdWithoutTemporaryImage,
        [permanentImage.id]: permanentImage,
      }
    case OPTIMISTICALLY_DELETE_IMAGE:
      const { [String(action.payload.imageId)]: deletedImage, ...byIdWithoutDeletedImage } = state
      byIdWithoutDeletedImage[action.payload.temporaryImageCopyId] = {
        ...deletedImage,
        id: action.payload.temporaryImageCopyId,
        taskId: null,
        originalTaskId: deletedImage.taskId,
      }
      return byIdWithoutDeletedImage
    case DELETE_IMAGE_REQUEST_FAILED:
      const { [action.payload.temporaryImageCopyId]: temporaryCopyOfDeletedImage, ...byIdWithoutTemporaryCopyOfDeletedImage } = state
      const { originalTaskId, ...temporaryCopyOfDeletedImageWithoutOriginalTaskId} = temporaryCopyOfDeletedImage
      byIdWithoutTemporaryCopyOfDeletedImage[action.payload.imageId] = {
        ...temporaryCopyOfDeletedImageWithoutOriginalTaskId,
        id: action.payload.imageId,
        taskId: temporaryCopyOfDeletedImage.originalTaskId,
      }
      return byIdWithoutTemporaryCopyOfDeletedImage
    case DELETE_IMAGE_REQUEST_SUCCEEDED:
      const { [action.payload.temporaryImageCopyId]: copyOfDeletedImage, ...byIdWithoutCopyOfDeletedImage } = state
      return byIdWithoutCopyOfDeletedImage
    default:
      return state
  }
}

export default byId
