import { connect } from 'react-redux'
import NewTaskScreen from '../components/NewTaskScreen'
import { createTask } from '../redux/actions'

const mapStateToProps = (state, ownProps) => ({
  list: state.entities.lists.byId[ownProps.navigation.state.params.listId],
})

export default connect(
  mapStateToProps,
  { createTask },
)(NewTaskScreen)
