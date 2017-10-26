import { AsyncStorage } from 'react-native'
import { generateAuthActions } from 'redux-token-auth'
import { baseUrl } from './constants'

const config = {
  authUrl: `${baseUrl}/auth`,
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
