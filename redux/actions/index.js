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
            list {
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

export const createTaskRequestSucceeded = (newTask) => ({
  type: CREATE_TASK_REQUEST_SUCCEEDED,
  payload: {
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
            list {
              id
            }
          }
        }
      `,
      variables: {
        description,
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
    dispatch(deleteTaskRequestSucceeded(taskId))
  } catch (error) {
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
    dispatch(deleteListRequestSucceeded(listId))
  } catch (error) {
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
