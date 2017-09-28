import { SET_HAS_SPLASH_SCREEN_BEEN_SHOWN } from '../../action-types'

const hasSplashScreenBeenShown = (state = false, action) => {
  switch (action.type) {
    case SET_HAS_SPLASH_SCREEN_BEEN_SHOWN:
      return action.payload.hasSplashScreenBeenShown
    default:
      return state
  }
}

export default hasSplashScreenBeenShown
