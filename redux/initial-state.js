const initialState = {
  hasSplashScreenBeenShown: false,
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      hasVerificationBeenAttempted: false,
      attributes: {
        firstName: null,
      },
    },
  },
}

export default initialState
