import { connect } from 'react-redux'
import NewTaskScreen from '../components/NewTaskScreen'
import { createTask } from '../redux/actions'

export default connect(
  null,
  { createTask },
)(NewTaskScreen)
