const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
    item: { type: String }
})


module.exports = mongoose.model('List', listSchema)