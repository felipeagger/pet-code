const request = require('supertest');

const app = require('../../../src/app');

/*    Ranking     */   
describe('Ranking', () => {

   it('it should post routes ranking', async (done) => {

      const response = await request(app).post('/api/ranking'); // request(app)
  
      expect(response.status).toBe(200);
  
      let { success } = response.body;
  
      //if this result is true
      expect(success).toBe(true);     
        
      done();
   }, 45000);

   it('it should get routes ranking', async (done) => {

      const response = await request(app).get('/api/ranking');
  
      expect(response.status).toBe(200);
  
      let ranking = response.body;
  
      //not is empty result
      expect(typeof ranking).toBe('object');
      expect(ranking.length).toBeGreaterThan(0);     
      
      done();
   });
   
});