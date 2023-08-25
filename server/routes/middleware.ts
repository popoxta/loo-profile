const logger = (req, res, next) => {
    console.log(`New request at ${req.path} at ${new Date()}`)
    next()
}

export {logger}