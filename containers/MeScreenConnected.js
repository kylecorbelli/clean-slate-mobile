import { connect } from 'react-redux'
import MeScreen from '../components/MeScreen'
import { signOutUser } from '../redux-token-auth-config'

const mapStateToProps = (state) => ({
  name: state.reduxTokenAuth.currentUser.attributes.firstName,
})

export default connect(
  mapStateToProps,
  { signOutUser },
)(MeScreen)
