const clientError = (res, msg) => res.status(400).send(msg)

const notFoundError = (res, msg) => res.status(404).send(msg)

const unauthorizedError = (res, msg) => res.status(401).send(msg)

const serverError = (res, msg) => res.status(500).send(msg)

export default {clientError, notFoundError, unauthorizedError, serverError}
