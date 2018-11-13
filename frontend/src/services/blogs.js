import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = userToken => {
  token = `Bearer ${userToken}`
}

const config = () => {
  return { headers: { 'Authorization': token } }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config())

  return response.data
}

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, config())

  return response
}

const like = async (blog) => {
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes + 1,
    url: blog.url,
    user: blog.user._id
  }

  const response = await update(blog.id, updatedBlog)

  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config())

  return response.data
}

export default { getAll, setToken, create, like, deleteBlog }