const api = require('../services/api');
const Ranking = require('../models/ranking');
const CharacterController = require('./CharacterController');
const LocationController = require('./LocationController');


module.exports = {

    async index(callback){

        Ranking.find({}, async function(err, ranking){
            if(err){
                return callback(400, {error: 'Error on find ranking: '+err}); 
            } else {     
                
                if (!ranking.length)
                    return callback(204, null);

                //Ordered by dimensions_count desc
                ranking = ranking.sort((a, b) => (a.dimensions_count < b.dimensions_count ? 1 : -1));
                
                return callback(200, ranking);
            }
        }); 
  
    },

    async reindexdb(callback){

        async function ProcessRank(element, i, allCharacters){
            try {

                let character = allCharacters[i].name;
                let image = allCharacters[i].image; 

                //check if it already exists                                      

                //Filter all Character with this EXACT NAME on DB.Characters
                await CharacterController.filter(character, async function(allCharactersWithName){ 
                    
                    //Generate Array with only names of locations, ex: ["World", "Moon"]
                    let Values = await allCharactersWithName.map(elem => elem.location.name);     
        
                    //Filter All Locations with this Name's
                    await LocationController.filterNameEquals(Values, async function(Dimensions){

                        //if not length = zero
                        if (Dimensions.length > 0){

                            //Insert Rank on DB.Ranking
                            //let Rank = new Ranking({character, image, dimensions_count: Dimensions.length});
                            let Rank = {character, image, dimensions_count: Dimensions.length};                                    
                            
                            //Insert
                            /*await Rank.save(function(error){
                                if(error){
                                console.log('Error on Save: '+error);
                                return false; 
                                } 
                            }); */   
                            
                            //Insert or Update on DB 
                            await Ranking.updateOne({character: character}, { $set: Rank }, {upsert: true},                     
                                function(error){
                                    if(error){
                                        console.log('Error on Insert/Update: '+error);
                                        return false; 
                                    }     
                            });
                            
                        }

                        if (i === (allCharacters.length - 1)){
                          return callback({success: true, msg: `Success!`});
                        }

                    }); 

                });                                    
                
            } catch (error) {
                console.log('Error on processing ranking: '+error);     
            }     
        }





        //Get All Characters from DB, Ordered by Id - index
        CharacterController.index(async function(allCharacters){

            //if test, only one for more fast
            if (process.env.NODE_ENV == 'test'){

                allCharacters = allCharacters.filter((element, i) => {
                    return i == 0;
                });  
                
            } else {

                if (!allCharacters.length){
                    await CharacterController.updatedb(function(response){
                        console.log(response);
                    });
            
                    await LocationController.updatedb(function(response){
                        console.log(response);
                    });

                    callback({success: true, msg: `Updating and ReIndexing Ranking... please wait 2 minutes, and retry!`});
                }

            }

            await allCharacters.forEach(async (element, i) => ProcessRank(element, i, allCharacters));
        });   
              
    }

};