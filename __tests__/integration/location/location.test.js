const request = require('supertest');

const app = require('../../../src/app');

/*    Locations     */   
describe('Locations', () => {

   it('it should post routes locations', async (done) => {

      const response = await request(app).post('/api/locations'); 
  
      expect(response.status).toBe(200);
  
      let { success } = response.body;
  
      //if this result is true
      expect(success).toBe(true);     
        
      done();
   }, 45000);

   it('it should get routes locations', async (done) => {

      const response = await request(app).get('/api/locations');
  
      expect(response.status).toBe(200);
  
      let locations = response.body;
  
      //not is empty result
      expect(typeof locations).toBe('object');
      expect(locations.length).toBeGreaterThan(0);     
      
      done();
   });
    
   it('it should get routes locations/locationId with response.status = 200', async (done) => {

      const response = await request(app).get('/api/locations/1');
  
      expect(response.status).toBe(200);
  
      let location = response.body;
  
      //not is empty result
      expect(typeof location).toBe('object');
      expect(location.length).toBeGreaterThan(0);    
        
      done();
   });

   it('it should get routes locations/locationId with response.status = 404', async (done) => {

      const response = await request(app).get('/api/locations/99999');
  
      expect(response.status).toBe(404);   
        
      done();
   });

   it('it should get routes locations/locationName', async (done) => {

      const response = await request(app).get('/api/locations/filter/World');
  
      expect(response.status).toBe(200);
  
      let location = response.body;
  
      //not is empty result
      expect(typeof location).toBe('object');
      expect(location.length).toBeGreaterThan(0);    
        
      done();
   });

   it('it should get routes locations/ordered', async (done) => {

      const response = await request(app).get('/api/locations/ordered');
  
      expect(response.status).toBe(200);
  
      let locations = response.body;
  
      //not is empty result
      expect(typeof locations).toBe('object');
      expect(locations.length).toBeGreaterThan(0);     
      
      done();
   });


});