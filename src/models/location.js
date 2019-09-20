const { Schema, model } = require('mongoose');

const LocationSchema = new Schema({

    id: {type: Number,
        unique: true},
    name:String,
    type:String,
    dimension:String,
    residents: []
    
},
{
    timestamps: true,
});

module.exports = model('Location', LocationSchema);