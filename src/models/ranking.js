const { Schema, model } = require('mongoose');

const RankingSchema = new Schema({

    character: {type: String,
        unique: true},    
    image:String,
    dimensions_count:Number   
     
});

module.exports = model('Ranking', RankingSchema);