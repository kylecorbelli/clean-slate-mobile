import axios from 'axios'
import { graphql } from '../../services/graphql'
import {
  CREATE_LIST_REQUEST_FAILED,
  CREATE_LIST_REQUEST_SENT,
  CREATE_LIST_REQUEST_SUCCEEDED,
  CREATE_TASK_REQUEST_FAILED,
  CREATE_TASK_REQUEST_SENT,
  CREATE_TASK_REQUEST_SUCCEEDED,
  DELETE_LIST_REQUEST_FAILED,
  DELETE_LIST_REQUEST_SENT,
  DELETE_LIST_REQUEST_SUCCEEDED,
  DELETE_TASK_REQUEST_FAILED,
  DELETE_TASK_REQUEST_SENT,
  DELETE_TASK_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_FAILED,
  FETCH_LISTS_AND_TASKS_REQUEST_SENT,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  SET_HAS_SPLASH_SCREEN_BEEN_SHOWN,
  UPDATE_TASK_REQUEST_FAILED,
  UPDATE_TASK_REQUEST_SENT,
  UPDATE_TASK_REQUEST_SUCCEEDED,
  UPDATE_LIST_REQUEST_FAILED,
  UPDATE_LIST_REQUEST_SENT,
  UPDATE_LIST_REQUEST_SUCCEEDED,
  OPTIMISTICALLY_ADD_IMAGE,
  CLOUDINARY_REQUEST_SENT,
  CLOUDINARY_REQUEST_FAILED,
  CLOUDINARY_REQUEST_SUCCEEDED,
  CREATE_IMAGE_REQUEST_SENT,
  CREATE_IMAGE_REQUEST_FAILED,
  CREATE_IMAGE_REQUEST_SUCCEEDED,
  OPTIMISTICALLY_DELETE_IMAGE,
  DELETE_IMAGE_REQUEST_FAILED,
  DELETE_IMAGE_REQUEST_SENT,
  DELETE_IMAGE_REQUEST_SUCCEEDED,
} from '../action-types'

export const setHasSplashScreenBeenShown = (hasSplashScreenBeenShown) => ({
  type: SET_HAS_SPLASH_SCREEN_BEEN_SHOWN,
  payload: {
    hasSplashScreenBeenShown,
  },
})

export const fetchListsAndTasksRequestSent = () => ({
  type: FETCH_LISTS_AND_TASKS_REQUEST_SENT,
})

export const fetchListsAndTasksRequestFailed = () => ({
  type: FETCH_LISTS_AND_TASKS_REQUEST_FAILED,
})

export const fetchListsAndTasksRequestSucceeded = ({ listsById, tasksById, imagesById }) => ({
  type: FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  payload: {
    imagesById,
    listsById,
    tasksById,
  },
})

export const fetchListsAndTasks = () => async (dispatch) => {
  dispatch(fetchListsAndTasksRequestSent())
  try {
    const response = await graphql({
      query: `
        query {
          lists {
            id
            title
            tasks {
              id
            }
          }
          tasks {
            id
            name
            description
            isDone
            list {
              id
            }
          }
          images {
            id
            url
            task {
              id
            }
          }
        }
      `,
    })
    const listsById = response.data.data.lists.reduce(
      (cumulativeLists, currentList) => {
        const listWithTaskIds = {
          ...currentList,
          taskIds: currentList.tasks.map(task => task.id)
        }
        delete listWithTaskIds.tasks
        return {
          ...cumulativeLists,
          [currentList.id]: listWithTaskIds
        }
      },
      {},
    )
    const tasksById = response.data.data.tasks.reduce(
      (cumulativeTasks, currentTask) => {
        const { list, ...currentTaskWithoutList } = currentTask
        return {
          ...cumulativeTasks,
          [currentTaskWithoutList.id]: {
            ...currentTaskWithoutList,
            listId: list.id,
          },
        }
      },
      {},
    )
    const imagesById = response.data.data.images.reduce(
      (cumulativeImages, currentImage) => {
        const { task, ...currentImageWithoutTask } = currentImage
        return {
          ...cumulativeImages,
          [currentImageWithoutTask.id]: {
            ...currentImageWithoutTask,
            taskId: task.id,
          },
        }
      },
      {},
    )
    dispatch(fetchListsAndTasksRequestSucceeded({ listsById, tasksById, imagesById }))
  } catch (error) {
    dispatch(fetchListsAndTasksRequestFailed())
    throw error
  }
}

export const createListRequestSent = () => ({
  type: CREATE_LIST_REQUEST_SENT,
})

export const createListRequestFailed = () => ({
  type: CREATE_LIST_REQUEST_FAILED,
})

export const createListRequestSucceded = (newList) => ({
  type: CREATE_LIST_REQUEST_SUCCEEDED,
  payload: {
    newList,
  },
})

export const createList = (title) => async (dispatch) => {
  dispatch(createListRequestSent())
  try {
    const response = await graphql({
      query: `
        mutation CreateList($title: String) {
          createList(title: $title) {
            id
            title
          }
        }
      `,
      variables: {
        title,
      },
    })
    const newList = {
      ...response.data.data.createList,
      taskIds: [],
    }
    dispatch(createListRequestSucceded(newList))
    return newList
  } catch (error) {
    dispatch(createListRequestFailed())
    throw error
  }
}

export const createTaskRequestSent = () => ({
  type: CREATE_TASK_REQUEST_SENT,
})

export const createTaskRequestFailed = () => ({
  type: CREATE_TASK_REQUEST_FAILED,
})

export const createTaskRequestSucceeded = (newTask) => ({
  type: CREATE_TASK_REQUEST_SUCCEEDED,
  payload: {
    newTask,
  },
})

export const createTask = (name, listId) => async (dispatch) => {
  dispatch(createTaskRequestSent())
  try {
    const response = await graphql({
      query: `
        mutation CreateTask($listId: ID!, $name: String!) {
          createTask(listId: $listId, name: $name) {
            id
            description
            name
            isDone
            list {
              id
            }
          }
        }
      `,
      variables: {
        name,
        listId,
      },
    })
    const { list, ...newTask} = response.data.data.createTask
    const newTaskWithListId = {
      ...newTask,
      listId,
    }
    dispatch(createTaskRequestSucceeded(newTaskWithListId))
    return newTaskWithListId
  } catch (error) {
    dispatch(createTaskRequestFailed())
    throw error
  }
}

export const deleteTaskRequestSent = () => ({
  type: DELETE_TASK_REQUEST_SENT,
})

export const deleteTaskRequestFailed = () => ({
  type: DELETE_TASK_REQUEST_FAILED,
})

export const deleteTaskRequestSucceeded = (taskId) => ({
  type: DELETE_TASK_REQUEST_SUCCEEDED,
  payload: {
    taskId,
  },
})

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(deleteTaskRequestSent())
  try {
    dispatch(deleteTaskRequestSucceeded(taskId))
    await graphql({
      query: `
        mutation DeleteTask($id: ID!) {
          deleteTask(id: $id) {
            id
          }
        }
      `,
      variables: {
        id: taskId,
      },
    })
  } catch (error) {
    // Have to undo the optimistic deletion if the request fails:
    dispatch(deleteTaskRequestFailed())
    throw error
  }
}

export const deleteListRequestSent = () => ({
  type: DELETE_LIST_REQUEST_SENT,
})

export const deleteListRequestFailed = () => ({
  type: DELETE_LIST_REQUEST_FAILED,
})

export const deleteListRequestSucceeded = (listId) => ({
  type: DELETE_LIST_REQUEST_SUCCEEDED,
  payload: {
    listId,
  },
})

export const deleteList = (listId) => async (dispatch) => {
  dispatch(deleteListRequestSent())
  try {
    dispatch(deleteListRequestSucceeded(listId))
    await graphql({
      query: `
        mutation DeleteList($id: ID!) {
          deleteList(id: $id) {
            id
          }
        }
      `,
      variables: {
        id: listId,
      },
    })
  } catch (error) {
    // Have to undo the optimistic deletion if the request fails:
    dispatch(deleteListRequestFailed())
    throw error
  }
}

export const updateTaskRequestSent = () => ({
  type: UPDATE_TASK_REQUEST_SENT,
})

export const updateTaskRequestFailed = () => ({
  type: UPDATE_TASK_REQUEST_FAILED,
})

export const updateTaskRequestSucceeded = (taskId, updatedTaskDetails) => ({
  type: UPDATE_TASK_REQUEST_SUCCEEDED,
  payload: {
    taskId,
    updatedTaskDetails,
  },
})

export const updateTask = (taskId, updatedTaskDetails) => async (dispatch) => {
  dispatch(updateTaskRequestSent())
  try {
    dispatch(updateTaskRequestSucceeded(taskId, updatedTaskDetails))
    const response = await graphql({
      query: `
        mutation UpdateTask($id: ID!, $taskInput: TaskInput!) {
          updateTask(id: $id, taskInput: $taskInput) {
            id
          }
        }
      `,
      variables: {
        id: taskId,
        taskInput: updatedTaskDetails,
      },
    })
  } catch (error) {
    // Will need to undo the optimistic update if the request fails:
    dispatch(updateTaskRequestFailed())
    throw error
  }
}

export const updateListRequestSent = () => ({
  type: UPDATE_LIST_REQUEST_SENT,
})

export const updateListRequestFailed = () => ({
  type: UPDATE_LIST_REQUEST_FAILED,
})

export const updateListRequestSucceeded = (listId, updatedListDetails) => ({
  type: UPDATE_LIST_REQUEST_SUCCEEDED,
  payload: {
    listId,
    updatedListDetails,
  },
})

export const updateList = (listId, updatedListDetails) => async (dispatch) => {
  dispatch(updateListRequestSent())
  try {
    dispatch(updateListRequestSucceeded(listId, updatedListDetails))
    await graphql({
      query: `
        mutation UpdateList($id: ID!, $listInput: ListInput!) {
          updateList(id: $id, listInput: $listInput) {
            id
          }
        }
      `,
      variables: {
        id: listId,
        listInput: updatedListDetails,
      },
    })
  } catch (error) {
    // Will need to handle optimisic update if the request fails
    dispatch(updateListRequestFailed())
    throw error
  }
}

export const optimisticallyAddImage = (temporaryImage) => ({
  type: OPTIMISTICALLY_ADD_IMAGE,
  payload: {
    temporaryImage,
  },
})

export const cloudinaryRequestSent = () => ({
  type: CLOUDINARY_REQUEST_SENT,
})

export const cloudinaryRequestFailed = (temporaryImageId) => ({
  type: CLOUDINARY_REQUEST_FAILED,
  payload: {
    temporaryImageId,
  },
})

export const cloudinaryRequestSucceeded = () => ({
  type: CLOUDINARY_REQUEST_SUCCEEDED,
})

export const createImageRequestSent = () => ({
  type: CREATE_IMAGE_REQUEST_SENT,
})

export const createImageRequestFailed = (temporaryImageId) => ({
  type: CREATE_IMAGE_REQUEST_FAILED,
  payload: {
    temporaryImageId,
  },
})

export const createImageRequestSucceeded = (temporaryImageId, permanentImage) => ({
  type: CREATE_IMAGE_REQUEST_SUCCEEDED,
  payload: {
    temporaryImageId,
    permanentImage,
  },
})

export const addImage = (taskId, photoPath, base64Image) => async (dispatch) => {
  const temporaryImageId = `temp-${new Date().valueOf()}`
  const temporaryImage = {
    id: temporaryImageId,
    url: photoPath,
    taskId,
  }
  dispatch(optimisticallyAddImage(temporaryImage))
  dispatch(cloudinaryRequestSent())
  let cloudinaryResponse
  try {
    cloudinaryResponse = await axios({
      method: 'POST',
      url: 'https://api.cloudinary.com/v1_1/dk1ym28wm/image/upload',
      data: {
        file: `data:image/png;base64,${base64Image}`,
        upload_preset: 'nuxgzvk1',
      },
    })
    dispatch(cloudinaryRequestSucceeded())
  } catch (error) {
    dispatch(cloudinaryRequestFailed(temporaryImageId))
    throw error
  }
  const imageUrl = cloudinaryResponse.data.secure_url
  try {
    dispatch(createImageRequestSent())
    const graphqlResponse = await graphql({
      query: `
        mutation CreateImage($taskId: ID!, $url: String!) {
          createImage(taskId: $taskId, url: $url) {
            id
            url
            task {
              id
            }
          }
        }
      `,
      variables: {
        taskId,
        url: imageUrl,
      },
    })
    const { task, ...permanentImage } = graphqlResponse.data.data.createImage
    permanentImage.taskId = task.id
    dispatch(createImageRequestSucceeded(temporaryImageId, permanentImage))
  } catch (error) {
    dispatch(createImageRequestFailed(temporaryImageId))
    throw error
  }
}

export const optimisticallyDeleteImage = (imageId, temporaryImageCopyId) => ({
  type: OPTIMISTICALLY_DELETE_IMAGE,
  payload: {
    imageId,
    temporaryImageCopyId,
  },
})

export const deleteImageRequestSent = () => ({
  type: DELETE_IMAGE_REQUEST_SENT,
})

export const deleteImageRequestFailed = (imageId, temporaryImageCopyId) => ({
  type: DELETE_IMAGE_REQUEST_FAILED,
  payload: {
    imageId,
    temporaryImageCopyId,
  },
})

export const deleteImageRequestSucceeded = (temporaryImageCopyId) => ({
  type: DELETE_IMAGE_REQUEST_SUCCEEDED,
  payload: {
    temporaryImageCopyId,
  },
})

export const deleteImage = (imageId) => async (dispatch) => {
  const temporaryImageCopyId = `temp-${new Date().valueOf()}`
  dispatch(optimisticallyDeleteImage(imageId, temporaryImageCopyId))
  try {
    dispatch(deleteImageRequestSent())
    const response = await graphql({
      query: `
        mutation DeleteImage($id: ID!) {
          deleteImage(id: $id) {
            id
          }
        }
      `,
      variables: {
        id: imageId,
      },
    })
    dispatch(deleteImageRequestSucceeded(temporaryImageCopyId))
  } catch (error) {
    dispatch(deleteImageRequestFailed(imageId, temporaryImageCopyId))
  }
}
