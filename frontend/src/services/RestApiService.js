import axios from 'axios'

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.token = null
    }

    setToken(token) {
        this.token = `Bearer ${token}`
    }

    config() {
        return { headers: { 'Authorization': this.token } }
    }

    async getAll() {
        const response = await axios.get(this.baseUrl)
        return response.data
    }

    async create(obj) {
        const response = await axios.post(this.baseUrl, obj, this.config())
        return response.data
    }

    async update(id, obj) {
        const response = await axios.put(`${this.baseUrl}/${id}`, obj, this.config())
        return response.data
    }

    async deleteObj(obj) {
        const response = await axios.delete(`${this.baseUrl}/${obj.id}`, this.config())
        return response.data
    }

    async post(relativePath, obj, config) {
        const response = await axios.post(
            `${this.baseUrl}${relativePath ? '/' + relativePath : ''}`,
            obj,
            config ? this.config() : null
        )
        return response.data
    }
}

export default RestApiService