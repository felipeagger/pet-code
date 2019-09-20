const axios = require('axios');

module.exports = {
   
   async get(endpoint){
      
      const response = await axios.get(`https://rickandmortyapi.com/api/${endpoint}`);

      return response.data;
   }
   
};