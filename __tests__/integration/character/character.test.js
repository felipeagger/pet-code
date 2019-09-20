const request = require('supertest');

const app = require('../../../src/app');

/*    Characters     */   
describe('Characters', () => {

   it('it should post routes characters', async (done) => {

      const response = await request(app).post('/api/characters'); 
  
      expect(response.status).toBe(200);
  
      let { success } = response.body;
  
      //if this result is true
      expect(success).toBe(true);     
        
      done();
   }, 45000);

   it('it should get routes characters', async (done) => {

      const response = await request(app).get('/api/characters');
  
      expect(response.status).toBe(200);
  
      let characters = response.body;
  
      //not is empty result
      expect(typeof characters).toBe('object');
      expect(characters.length).toBeGreaterThan(0);     
      
      done();
   });
    
   it('it should get routes characters/characterId with response.status = 200', async (done) => {

      const response = await request(app).get('/api/characters/1');
  
      expect(response.status).toBe(200);
  
      let character = response.body;
  
      //not is empty result
      expect(typeof character).toBe('object');
      expect(character.length).toBeGreaterThan(0);    
        
      done();
   });

   it('it should get routes characters/characterId with response.status = 404', async (done) => {

      const response = await request(app).get('/api/characters/99999');
  
      expect(response.status).toBe(404);   
        
      done();
   });

   it('it should get routes characters/characterName', async (done) => {

      const response = await request(app).get('/api/characters/filter/Rick Sanchez');
  
      expect(response.status).toBe(200);
  
      let character = response.body;
  
      //not is empty result
      expect(typeof character).toBe('object');
      expect(character.length).toBeGreaterThan(0);    
        
      done();
   });


});