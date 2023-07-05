const request = require('supertest');

describe('Get /Instructors', function() {
    it('responds with json', function(done) {
      request('http://localhost:3000')
        .get('/api/Instructors')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});