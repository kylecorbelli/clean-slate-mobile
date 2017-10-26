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
    images: {
      byId: {},
      isLoading: false,
    },
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
