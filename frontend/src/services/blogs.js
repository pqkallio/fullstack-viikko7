import RestApiService from './RestApiService'

const baseUrl = '/api/blogs'

class BlogService extends RestApiService {
  constructor() {
    super(baseUrl)
  }

  async like(blog) {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user._id,
      comments: blog.comments
    }

    const updated = await super.update(blog.id, updatedBlog)
    return updated
  }

  async addComment(blog, comment) {
    const updated = await super.post(`${blog.id}/comments`, { comment })
    return updated
  }
}

export default BlogService