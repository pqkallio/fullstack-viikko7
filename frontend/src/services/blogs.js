import ApiService from './ApiService'

const baseUrl = '/api/blogs'

class BlogService extends ApiService {
  constructor() {
    super(baseUrl)
  }

  async like(blog) {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user._id
    }

    const updated = await super.update(blog.id, updatedBlog)

    return updated
  }
}

export default BlogService