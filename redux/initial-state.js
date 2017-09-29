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
      byId: {
        1: {
          id: 1,
          title: 'Groceries',
          taskIds: [ 1, 2, 4 ],
        },
        2: {
          id: 2,
          title: 'React Resources',
          taskIds: [ 3, 5 ],
        },
      },
    },
    tasks: {
      byId: {
        1: {
          id: 1,
          description: 'Beer',
          isDone: false,
          listId: 1,
        },
        2: {
          id: 2,
          description: 'Newspaper',
          isDone: false,
          listId: 1,
        },
        3: {
          id: 3,
          description: 'Redux',
          isDone: true,
          listId: 2,
        },
        4: {
          id: 4,
          description: 'Coffee',
          isDone: true,
          listId: 1,
        },
        5: {
          id: 5,
          description: 'React Native',
          isDone: false,
          listId: 2,
        },
      },
    },
  },
}

export default initialState
