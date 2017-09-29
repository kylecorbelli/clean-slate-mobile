import { connect } from 'react-redux'
import NewListScreen from '../components/NewListScreen'
import { createList } from '../redux/actions'

export default connect(
  null,
  { createList },
)(NewListScreen)
