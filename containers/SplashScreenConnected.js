import { connect } from 'react-redux'
import SplashScreen from '../components/SplashScreen'
import { setHasSplashScreenBeenShown } from '../redux/actions'

const mapStateToProps = (state) => ({
  isCurrentUserSignedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  hasVerificationBeenAttempted: state.reduxTokenAuth.currentUser.hasVerificationBeenAttempted,
  hasSplashScreenBeenShown: state.hasSplashScreenBeenShown,
})

export default connect(
  mapStateToProps,
  { setHasSplashScreenBeenShown },
)(SplashScreen)
