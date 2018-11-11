const sort = (a, b) => {
    const likeDifference = b.likes - a.likes

    if (likeDifference === 0) {
        return a.title.localeCompare(b.title)
    }

    return likeDifference
}

const formatBlogToString = (blog) => {
    return `'${blog.title}' by ${blog.author}`
}

export default { sort, formatBlogToString }