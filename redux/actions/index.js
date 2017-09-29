import { graphql } from '../../services/graphql'
import {
  CREATE_LIST_REQUEST_FAILED,
  CREATE_LIST_REQUEST_SENT,
  CREATE_LIST_REQUEST_SUCCEEDED,
  CREATE_TASK_REQUEST_FAILED,
  CREATE_TASK_REQUEST_SENT,
  CREATE_TASK_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_FAILED,
  FETCH_LISTS_AND_TASKS_REQUEST_SENT,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  SET_HAS_SPLASH_SCREEN_BEEN_SHOWN,
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

export const fetchListsAndTasksRequestSucceeded = ({ listsById, tasksById }) => ({
  type: FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  payload: {
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
            description
            isDone
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
        return {
          ...cumulativeTasks,
          [currentTask.id]: currentTask,
        }
      },
      {},
    )
    dispatch(fetchListsAndTasksRequestSucceeded({ listsById, tasksById }))
  } catch (error) {
    console.error(error)
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

export const createTaskRequestSucceeded = (newTask, listId) => ({
  type: CREATE_TASK_REQUEST_SUCCEEDED,
  payload: {
    listId,
    newTask,
  },
})

export const createTask = (description, listId) => async (dispatch) => {
  dispatch(createTaskRequestSent())
  try {
    const response = await graphql({
      query: `
        mutation CreateTask($listId: ID!, $description: String!) {
          createTask(listId: $listId, description: $description) {
            id
            description
            isDone
          }
        }
      `,
      variables: {
        description,
        listId,
      },
    })
    const newTask = response.data.data.createTask
    dispatch(createTaskRequestSucceeded(newTask, listId))
    return newTask
  } catch (error) {
    dispatch(createTaskRequestFailed())
    throw error
  }
}
