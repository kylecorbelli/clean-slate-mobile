import axios from 'axios'

export const graphql = ({ query, variables }) => {
  return axios({
    method: 'POST',
    // url: 'http://localhost:3000/graphql',
    url: 'https://blueberry-pudding-19740.herokuapp.com/graphql',
    data: {
      query,
      variables,
    },
  })
}
