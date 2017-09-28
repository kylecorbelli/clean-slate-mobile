import { SET_HAS_SPLASH_SCREEN_BEEN_SHOWN } from '../action-types'

export const setHasSplashScreenBeenShown = (hasSplashScreenBeenShown) => ({
  type: SET_HAS_SPLASH_SCREEN_BEEN_SHOWN,
  payload: {
    hasSplashScreenBeenShown,
  },
})
