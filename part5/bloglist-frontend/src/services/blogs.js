/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

// creating tokens
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// forwarding requests
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlogObj) => {
  const config = {
    headers: { Authorization: token },
  } 

  const response = await axios.post(baseUrl, newBlogObj, config)
  return response.data
}

const addLike = async (blogObj, blogId) => {
  const config = {
    headers: { Authorization: token },
  } 

  const response = await axios.put(`${baseUrl}/${blogId}`, blogObj, config)
  return response.data
}

export default { setToken, getAll, addBlog, addLike }