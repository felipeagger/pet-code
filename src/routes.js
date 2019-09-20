const express = require('express');
const CharacterController = require('./controllers/CharacterController');
const LocationController = require('./controllers/LocationController');
const RankingController = require('./controllers/RankingController');
const path = require('path');
const publicpath = path.join(__dirname, 'public');

const routes = express.Router();

//Routes

//View
routes.get('/', function(req, res) {
    res.sendFile(path.join(publicpath, 'index.html'));
});



/*       API EndPoint's      */

/*   Characters   */

//All Characters EndPoint
routes.get('/api/characters', async function(req, res){
    await CharacterController.index(function(response){
        res.json(response);
    });    
}); 

//Post - Get & Process from Data Souce
routes.post('/api/characters', async function(req, res){
    await CharacterController.updatedb(function(response){
        res.json(response);
    });
});

//Filter by Id EndPoint
routes.get('/api/characters/:characterId', async function(req, res){

    let characterId = req.params.characterId;

    await CharacterController.filterId(characterId, function(code, response){
        res.status(code).json(response);
    });    
});

//Filter by Name EndPoint
routes.get('/api/characters/filter/:characterName', async function(req, res){

    let characterName = req.params.characterName;

    await CharacterController.filter(characterName, function(response){
        res.json(response);
    });    
});


/*   Locations    */

//All Locations EndPoint
routes.get('/api/locations', LocationController.index);  

//Post - Get & Process from Data Souce
routes.post('/api/locations', async function(req, res){
    await LocationController.updatedb(function(response){
        res.json(response);
    });
});

//All Locations Ordered by Name Desc
routes.get('/api/locations/ordered', LocationController.indexOrdered); 


//Filter by Id EndPoint
routes.get('/api/locations/:locationId', async function(req, res){

    let locationId = req.params.locationId;

    await LocationController.filterId(locationId, function(code, response){
        res.status(code).json(response);
    });    
});

//Filter by Name EndPoint
routes.get('/api/locations/filter/:locationName', async function(req, res){

    let locationName = req.params.locationName;

    await LocationController.filter(locationName, function(response){
        res.json(response);
    });    
});


/*     Ranking    */

//All Locations EndPoint
//routes.get('/api/ranking', RankingController.index);  

routes.get('/api/ranking', async function(req, res){
    
    await RankingController.index(function(code, response){
        if (code == 204){

            RankingController.reindexdb(function(response){});
            res.status(200).json({success: true, msg: `Updating and ReIndexing Ranking... please wait 2 minutes, and retry!`});

        } else {
            res.status(code).json(response);
        }
    });    
}); 


//Post - Get & Process from Data Souce
routes.post('/api/ranking', async function(req, res){

    await RankingController.reindexdb(function(response){
        res.json(response);
    });
});






module.exports = routes;