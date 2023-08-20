async function tryCatchNext(cb, next) {
    try {
        await cb()
    } catch (e) {
        next(e)
    }
}

export {tryCatchNext}