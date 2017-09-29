import axios from 'axios'
import {
  FETCH_LISTS_AND_TASKS_REQUEST_SENT,
  FETCH_LISTS_AND_TASKS_REQUEST_SUCCEEDED,
  FETCH_LISTS_AND_TASKS_REQUEST_FAILED,
  SET_HAS_SPLASH_SCREEN_BEEN_SHOWN,
} from '../action-types'

export const setHasSplashScreenBeenShown = (hasSplashScreenBeenShown) => ({
  type: SET_HAS_SPLASH_SCREEN_BEEN_SHOWN,
  payload: {
    hasSplashScreenBeenShown,
  },
})

// TEST ALL OF THIS, DUMMY!

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
    const response = await axios({
      method: 'POST',
      url: 'https://blueberry-pudding-19740.herokuapp.com/graphql',
      data: {
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
      },
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
