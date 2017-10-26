import axios from 'axios'
import { baseUrl } from '../constants'

export const graphql = ({ query, variables }) => {
  return axios({
    method: 'POST',
    url: `${baseUrl}/graphql`,
    data: {
      query,
      variables,
    },
  })
}
