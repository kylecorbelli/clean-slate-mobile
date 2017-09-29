import { connect } from 'react-redux'
import ListScreen from '../components/ListScreen'

const mapStateToProps = (state, ownProps) => {
  const { listId } = ownProps.navigation.state.params
  const list = state.entities.lists.byId[listId]
  const tasksById = state.entities.tasks.byId
  return {
    list: {
      ...list,
      tasks: list.taskIds.map(taskId => tasksById[taskId]),
    },
  }
}

export default connect(
  mapStateToProps,
)(ListScreen)
