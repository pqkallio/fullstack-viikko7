const tokenExtractor = (request, _, next) => {
    const authorization = request.get('authorization')
    let token

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    } else {
        token = null
    }

    request.token = token

    next()
}

const logger = (request, _, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

module.exports = {
    tokenExtractor,
    logger
}