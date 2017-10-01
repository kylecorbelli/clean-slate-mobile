import { connect } from 'react-redux'
import ListScreen from '../components/ListScreen'
import { deleteTask } from '../redux/actions'
import { byIdToArray } from '../services/utilities'

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps.navigation.state.params
  const list = state.entities.lists.byId[listId]
  const tasksById = state.entities.tasks.byId
  const tasks = byIdToArray(tasksById)
  return {
    list: {
      ...list,
      tasks: tasks.filter(task => task.listId === listId)
    },
  }
}

export default connect(
  mapStateToProps,
  { deleteTask },
)(ListScreen)
