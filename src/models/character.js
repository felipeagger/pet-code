const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({

    id: {type: Number,
         unique: true},
    name:String,
    status:String,
    species:String,
    type:String,
    gender:String,
    image:String,

    origin:{
        name:String,
        url:String
    },

    location:{
        name:String,
        url:String
    }   
    
},
{
    timestamps: true,
});

module.exports = model('Character', CharacterSchema);