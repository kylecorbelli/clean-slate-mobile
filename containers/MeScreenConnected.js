import { connect } from 'react-redux'
import MeScreen from '../components/MeScreen'

const mapStateToProps = (state) => ({
  name: state.name,
})

export default connect(
  mapStateToProps,
)(MeScreen)
