import axios from "axios"
const baseUrl = "/api/blogs"

const getCommentsOfBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const create = async (comment, blogId) => {
  const commentObj = {
    comment: comment,
    blog: blogId
  }

  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObj)
  console.log("Services/comments.js --> create --> response.data (new comment):", response.data)
  return response.data
}

export default { getCommentsOfBlog, create }