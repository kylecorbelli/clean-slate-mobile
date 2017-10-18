import { connect } from 'react-redux'
import ListNavbarTitle from '../components/ListNavbarTitle'

const mapStateToProps = (state, ownProps) => ({
  title: state.entities.lists.byId[ownProps.navigation.state.params.listId].title,
})

export default connect(
  mapStateToProps,
)(ListNavbarTitle)
