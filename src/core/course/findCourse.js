import axios from 'axios'

export default (search, pageNumber = 1) => {
  return axios.get(
    `https://www.udemy.com/api-2.0/users/me/subscribed-courses?page_size=20&search=${search}&page=${pageNumber}`
  )
}
