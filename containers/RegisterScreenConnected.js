import { connect } from 'react-redux'
import RegisterScreen from '../components/RegisterScreen'
import { updateName } from '../redux/actions'

export default connect(
  null,
  { updateName },
)(RegisterScreen)
