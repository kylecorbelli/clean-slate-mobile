import { connect } from 'react-redux'
import RenameListScreen from '../components/RenameListScreen'
import { updateList } from '../redux/actions'

const mapStateToProps = (state, ownProps) => ({
  list: state.entities.lists.byId[ownProps.navigation.state.params.listId],
})

export default connect(
  mapStateToProps,
  { updateList },
)(RenameListScreen)
