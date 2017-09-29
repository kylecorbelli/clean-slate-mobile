import { connect } from 'react-redux'
import ListsScreen from '../components/ListsScreen'
import { fetchListsAndTasks } from '../redux/actions'

const mapStateToProps = (state) => {
  const listsById = state.entities.lists.byId
  const tasksById = state.entities.tasks.byId
  return {
    lists: Object.keys(listsById).map(id => {
      const list = listsById[id]
      return {
        ...list,
        tasks: list.taskIds.map(taskId => tasksById[taskId])
      }
    }),
  }
}

export default connect(
  mapStateToProps,
  { fetchListsAndTasks },
)(ListsScreen)
