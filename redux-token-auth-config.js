import { AsyncStorage } from 'react-native'
import { generateAuthActions } from 'redux-token-auth'

const config = {
  // authUrl: 'http://localhost:3000/auth',
  authUrl: 'https://blueberry-pudding-19740.herokuapp.com/auth',
  storage: AsyncStorage,
  userAttributes: {
    firstName: 'name',
  },
  userRegistrationAttributes: {
    firstName: 'name',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
