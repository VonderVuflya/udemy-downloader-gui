import axios from 'axios'

export default courseid => {
  return axios.get(
    `https://www.udemy.com/api-2.0/courses/${courseid}/cached-subscriber-curriculum-items?page_size=100000`
  )
}
