const clientError = (res, msg) => res.status(400).json({msg})

export default {clientError}
