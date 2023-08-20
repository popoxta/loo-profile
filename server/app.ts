import express from 'express'
import looRouter from "./routes/loo-router";

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(looRouter)

app.use((err, req, res, next) => {
    if (!err) return
    console.log(`An error has occured. ${req.path}: ${err}`)
    res.status(500).json({message: 'An unexpected error has occurred.'})
})

app.listen(port, function () {
    console.log('Server is listening on port', port)
})


