import express from 'express'
import looRouter from "./routes/loo-router";

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use('/loos',looRouter)

server.use((err, req, res, next) => {
    if (!err) return
    console.log(`An error has occured. ${req.path}: ${err}`)
    res.status(500).json({message: 'An unexpected error has occurred.'})
})

export default server
