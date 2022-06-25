const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const EventSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    id: {
        type: String,
        default: function () {
            return new ObjectId().toString()
        }
    }
})

EventSchema.set('toJSON', {

    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

EventSchema.plugin(uniqueValidator)

module.exports=model('Event', EventSchema)