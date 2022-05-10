import axios from "axios"
const baseUrl = "/api/blogs"

const getCommentsOfBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const create = async (comment, blogId) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
  return response.data
}

export default { getCommentsOfBlog, create }