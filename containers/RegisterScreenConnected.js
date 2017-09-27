import { connect } from 'react-redux'
import RegisterScreen from '../components/RegisterScreen'
import { persistName } from '../redux/actions'

export default connect(
  null,
  { persistName },
)(RegisterScreen)
