const initialState = {
  name: 'Scroopy Noopers',
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null,
      },
    },
  },
}

export default initialState
