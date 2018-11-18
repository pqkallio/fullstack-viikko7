import ApiService from './ApiService'

const baseUrl = '/api/users'

class UserService extends ApiService {
    constructor() {
        super(baseUrl)
    }
}

export default UserService