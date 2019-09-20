const api = require('../services/api');
const Character = require('../models/character')
//const elasticsearch = require('../services/elasticsearch');

module.exports = {

   async index(callback){

      await Character.find({}, function(err, characters){
         if(err){
            return callback({error: 'Error on find characters: '+err});
         } else {

            //Ordered by Id
            characters = characters.sort((a, b) => (a.id > b.id ? 1 : -1)); 

            //Ordered by Name
            //characters = characters.sort((a, b) => (a.name > b.name ? 1 : -1));
             
            return callback(characters);
         }
      });
  
   },


   async indexdistinct(callback){  

      await Character.distinct("name", function(err, characters){
         if(err){
            return callback({error: 'Error on find characters: '+err});
         } else {

            //Ordered by Name
            characters = characters.sort((a, b) => (a > b ? 1 : -1));
             
            return callback(characters);
         }
      });
  
   },


   async filter(characterName, callback){

      function filtrar(character){
        if (character.name == characterName)
         return character;
      }
     
      //Filter on database
      //let query = { "name" : {'$regex' : characterName, '$options' : 'i'} };
      // Character.find(query, function(err, characters)

      Character.find({}, function(err, characters){
         if(err){
            return callback({error: 'Error on find characters: '+err});
         } else {

            //Filter by js 
            characters = characters.filter(filtrar); 
            
            //Ordered by Id
            characters = characters.sort((a, b) => (a.id > b.id ? 1 : -1)); 
             
            return callback(characters);
         }
      });
  
   },


   async filterId(characterId, callback){
   
      //Filter on database
      let query = { "id" : characterId };

      Character.find(query, function(err, characters){
         if(err){
            return callback(500, {error: 'Error on find characters: '+err});
         } else if (characters.length){             
            return callback(200, characters);
         }  else {
            return callback(404, {error: 'character not found!'});  
         }
      });
  
   },


   async updatedb(callback){

      // Get API
      console.log('Characters getting from API...');
      let page = 1;

      const responsePage1 = await api.get(`character/?page=${page}`);       

      let { pages } = responsePage1.info;

      //
      async function InsertOrUpdateCharacters(characters){

         characters.forEach(async (element, i) => {

            let personagem = characters[i];  
      
            //Find
            Character.findOne({'id':personagem.id}, async function(error, character){

               if(error){

                  console.log('Error on Find: '+error); 
                  return callback({success: false, msg: `Error on Find: ${error}!`});

               } else {
                  
                  //Insert or Update on DB    
                  await Character.updateOne({id: personagem.id}, { $set: personagem }, {upsert: true},                     
                     function(error){
                     if(error){
                        console.log('Error on Update: '+error); 
                        return callback({success: false, msg: `Error on Update: ${error}!`});
                     } 
                  });    

                  if (i === (characters.length - 1) && ((page === pages) || (process.env.NODE_ENV == 'test'))){
                     return callback({success: true, msg: `Success!`});
                  }
      
               } 
               
            });    

         });

      }  


      //Process page1
      await InsertOrUpdateCharacters(responsePage1.results);      


      if (process.env.NODE_ENV != 'test'){

         //Get & Process Other pages
         for ( page = 2; page <= pages; page++ ) { 

            console.log('getting page: '+page);   

            const responsePagination = await api.get(`character/?page=${page}`); 

            await InsertOrUpdateCharacters(responsePagination.results);    

         }  
      
      }

   }

};