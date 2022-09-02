const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roleId:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
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

module.exports = mongoose.model('UserRole', dataSchema)