import RestApiService from './RestApiService'

const baseUrl = '/api/users'

class UserService extends RestApiService {
    constructor() {
        super(baseUrl)
    }
}

export default UserService