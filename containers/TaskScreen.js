import { connect } from 'react-redux'
import TaskScreen from '../components/TaskScreen'
import { updateTask } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  const { entities: { lists, tasks } } = state
  const task = tasks.byId[ownProps.navigation.state.params.taskId]
  const list = lists.byId[task.listId]
  return {
    list,
    task,
  }
}

export default connect(
  mapStateToProps,
  { updateTask },
)(TaskScreen)
