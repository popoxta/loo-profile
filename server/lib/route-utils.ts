const clientError = (res, msg) => res.status(400).json({message: msg})

const notFoundError = (res, msg) => res.status(404).json({message: msg})

const unauthorizedError = (res, msg) => res.status(401).json({message: msg})

const serverError = (res, msg) => res.status(500).json({message: msg})

export default {clientError, notFoundError, unauthorizedError, serverError}
