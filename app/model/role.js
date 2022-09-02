const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    deletedAt:{
        required: false,
        type: Date
    }
})

dataSchema.set('timestamps',  true)

dataSchema.method("toJSON", function(){
    const { __v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = mongoose.model('Role', dataSchema)