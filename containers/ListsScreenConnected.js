import { connect } from 'react-redux'
import ListsScreen from '../components/ListsScreen'
import {
  deleteList,
  fetchListsAndTasks,
} from '../redux/actions'
import { byIdToArray } from '../services/utilities'

const mapStateToProps = (state) => {
  const listsById = state.entities.lists.byId
  const tasksById = state.entities.tasks.byId
  const tasks = byIdToArray(tasksById)
  return {
    lists: Object.keys(listsById).map(listId => {
      const list = listsById[listId]
      return {
        ...list,
        tasks: tasks.filter(task => task.listId === listId)
      }
    }),
    listsAndTasksAreLoading: state.entities.lists.isLoading,
  }
}

export default connect(
  mapStateToProps,
  {
    deleteList,
    fetchListsAndTasks,
  },
)(ListsScreen)
