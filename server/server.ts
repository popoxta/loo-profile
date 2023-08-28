import express from 'express'
import looRouter from "./routes/loo-router";
import reviewRouter from "./routes/review-router";
import locationRouter from "./routes/location-router";
import {logger} from "./routes/middleware";
import cors from 'cors'
import admin from 'firebase-admin'
import serviceAccount from './secrets/firebase_key.js'

admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

const server = express()

server.use(cors({
    origin: true,
}))

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(logger)

server.use('/loos', looRouter)
server.use('/reviews', reviewRouter)
server.use('/location', locationRouter)

server.use((err, req, res, next) => {
    if (!err) return
    console.log(`An error has occured. ${req.path}: ${err}`)
    res.status(500).json({message: 'An unexpected error has occurred.'})
})

export default server
