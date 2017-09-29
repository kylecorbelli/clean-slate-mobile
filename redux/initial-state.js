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
  entities: {
    lists: {
      byId: {},
      isLoading: false,
    },
    tasks: {
      byId: {},
      isLoading: false,
    },
  },
}

export default initialState
