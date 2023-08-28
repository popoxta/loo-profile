const clientError = (res, msg) => res.status(400).json({msg})

const notFoundError = (res, msg) => res.status(404).json({msg})

const unauthorizedError = (res, msg) => res.status(401).json({msg})

export default {clientError, notFoundError, unauthorizedError}
