import { connect } from 'react-redux'
import SignInScreen from '../components/SignInScreen'
import { signInUser } from '../redux-token-auth-config'

export default connect(
  null,
  { signInUser },
)(SignInScreen)
