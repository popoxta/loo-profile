// An asynchronous try-catch wrapper that awaits the given callback
// or calls next if an error is thrown
async function tryCatchNext(cb, next) {
    try {
        await cb()
    } catch (e) {
        next(e)
    }
}

export {tryCatchNext}