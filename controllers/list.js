const express = require('express')
const lists = express.Router()

const List = require('../models/list.js')


lists.get('/:id', (req, res) => {
    List.find({userId: req.params.id}, (error, foundList) => {
        if (error) {
            res.status(400).json({ error: error.message})
        }
        res.status(200).json(foundList)
    })
})

lists.post('/', (req, res) => {
    console.log(req.body)
    List.create(req.body, (error, createdList) => {
        if (error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).json(createdList)
    })
})

lists.put('/:id', (req,res) => {
    List.findByIdAndUpdate(req.params.id, req.body, { new: true}, (error, updatedList) =>{
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedList)
    })
})

lists.put('/:id', (req,res) => {
    List.findByIdAndRemove(req.params.id, req.body, { new: true}, (error, deletedList) =>{
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedList)
    })
})

module.exports = lists
