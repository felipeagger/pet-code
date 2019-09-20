const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const publicpath = path.join(__dirname, 'public');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const CharacterController = require('./controllers/CharacterController');
const LocationController = require('./controllers/LocationController');
const RankingController = require('./controllers/RankingController');

const app = express();

const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

require('dotenv').config({ path: envPath });

app.use(express.json());
app.use('/', express.static(publicpath));


//Database
urlcon = `mongodb://root:${process.env.MONGO_PASSWD}@${process.env.MONGO}:27017/${process.env.MONGO_BD}?authSource=admin`;  

function ConectDB(){
    mongoose.connect(urlcon, { useNewUrlParser: true }, function(err, res){
        if(err){
            console.log(`Nao foi possivel conectar a: '${urlcon}\nErro: ${err}`); 
        }
        else {
            console.log('Conectado: MongoDB!'); 
        }
    });
}


if (process.env.NODE_ENV != 'test'){

    setTimeout(function () {
        ConectDB();    
    }, 3000);

} else {
    ConectDB();
}

//Update Database three times on day
// 8hrs * 60min * 60s = 3x on day (24h/8h = 3x)
if (process.env.NODE_ENV != 'test'){
    let time =  8 * 60 * 60;

    setInterval(async function(){
        console.log('Auto Execution UpdateDB!');

        await CharacterController.updatedb(function(response){
            console.log(response);
        });

        await LocationController.updatedb(function(response){
            console.log(response);
        });

        await RankingController.reindexdb(function(response){
            console.log(response);
        });

    }, time * 1000);
}


app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);


module.exports = app;