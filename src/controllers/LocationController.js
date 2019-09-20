const api = require('../services/api');
const Location = require('../models/location');
//const elasticsearch = require('../services/elasticsearch');

module.exports = {

    async index(req, res){

        Location.find({}, function(err, locations){
            if(err){
                return res.status(400).json({error: 'Error on find location: '+err});
            } else {

                //Ordered by Id
                locations = locations.sort((a, b) => (a.id > b.id ? 1 : -1)); 
                
                return res.json(locations);
            }
        });
  
    },    


    async filter(locationName, callback){    

        function filtrar(location){
            if (location.name.includes(locationName))
            return location;
        }

        //Filter on database
        //let query = { "name" : {'$regex' : locationName, '$options' : 'i'} };
        // Location.find(query, function(err, locations)

        Location.find({}, function(err, locations){
            if(err){
                return callback({error: 'Error on find locations: '+err});
            } else {               

                //Filter by js 
                locations = locations.filter(filtrar);                  
                
                //Ordered by Id
                locations = locations.sort((a, b) => (a.id > b.id ? 1 : -1)); 
                
                return callback(locations);
            }
        });
   
    },


    async filterId(locationId, callback){
   
        //Filter on database
        let query = { "id" : locationId };
  
        Location.find(query, function(err, location){
           if(err){
                return callback(500, {error: 'Error on find location: '+err});
           } else if(location.length){             
                return callback(200, location);
           } else {
                return callback(404, {error: 'location not found!'});  
           }
        });
    
    },


    async filterNameEquals(Values, callback){

        //Values is a array
        let query = { "name" : { $in : Values } }; // { name : { $in : ["World","Terra","Moon"] } } 
     
        //Filter on database 
        // equivalent to = SELECT DISTINCT DIMENSION FROM LOCATIONS WHERE NAME IN ("WORLD", "TERRA", "MOON")

        await Location.distinct("dimension", query,  function(err, locations){  
            if(err){
                return callback([{error: "Error on find locations: "+err}]);
            } else {
                
                //Ordered by Id
                locations = locations.sort((a, b) => (a > b ? 1 : -1)); 

                //Apply distinct via js
                //locations = ["Terra", "Moon", "Terra", "Moon"] => locations = ["Terra", "Moon"]
                //locations = Array.from(new Set(locations));
               
                return callback(locations);
            }
        });       
   
    },

    async indexOrdered(req, res){

        Location.find({}, function(err, locations){
            if(err){
                return res.status(400).json({error: 'Error on find location: '+err});
            } else {

                //Ordered by Name Desc
                locations = locations.sort((a, b) => (a.name < b.name ? 1 : -1)); 
                //console.log(locations);
                
                return res.json(locations);
            }
        });
  
    },


    async updatedb(callback){

        // Get API
        console.log('Locations getting from API...');
        let page = 1;

        const responsePage1 = await api.get(`location/?page=${page}`);       

        let { pages } = responsePage1.info;     

        //
        async function InsertOrUpdateLocations(locations){

            locations.forEach(async (element, i) => {

                let localizacao = locations[i];  
    
                //Find
                Location.findOne({'id':localizacao.id}, async function(error, location){

                    if(error){

                        console.log('Error on Find: '+error); 
                        return callback({success: false, msg: `Error on Find: ${error}!`});

                    } else {
                    
                        //Insert or Update on DB    
                        await Location.updateOne({id: localizacao.id}, { $set: localizacao }, {upsert: true},                     
                        function(error){
                            if(error){
                                console.log('Error on Update: '+error);
                                return callback({success: false, msg: `Error on Update: ${error}!`}); 
                            } 
                        });  
                        
                        if (i === (locations.length - 1) && ((page === pages) || (process.env.NODE_ENV == 'test'))){
                            return callback({success: true, msg: `Success!`});
                        }
        
                    } 
                
                });

            });

        } 


        //Process page1
        await InsertOrUpdateLocations(responsePage1.results);     

        if (process.env.NODE_ENV != 'test'){

            //Get & Process Other pages
            for ( page = 2; page <= pages; page++ ) {
        
                console.log('getting page: '+page);   

                const responsePagination = await api.get(`location/?page=${page}`); 

                await InsertOrUpdateLocations(responsePagination.results);
            
            }  

        }
            
    }


};