import hasSplashScreenBeenShown from './index'
import { setHasSplashScreenBeenShown } from '../../actions'

describe('hasSplashScreenBeenShown', () => {
  describe('SET_HAS_SPLASH_SCREEN_BEEN_SHOWN', () => {
    it('sets hasSplashScreenBeenShown', () => {
      const initialState = false
      const action = setHasSplashScreenBeenShown(true)
      const result = hasSplashScreenBeenShown(initialState, action)
      expect(result).toBe(true)
    })
  })
})
