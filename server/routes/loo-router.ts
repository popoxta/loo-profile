import express from "express";

const looRouter = express.Router()

looRouter.get('/:id', async (req, res) => {
    console.log('eee')
})

export default looRouter