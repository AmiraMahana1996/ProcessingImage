import supertest from 'supertest';
import app from '../server';

// create a request object
const request = supertest(app);

// test resize request with name without width and height
describe('Test endpoint response', () => {
  it('Status Codes tests', async () => {
    const response = await request
      .get('/api/images?filename=hn&width=500&height=500')
      .query({ filename: 'hn', width: 500, height: 500 });
    expect(response.status).toBe(200);
  });
  //check all query params
  it('should enter width if undefined', async () => {
    const response = await request.get('/api/images?filename=keyboard&height');
    expect(response.text).toBe('{"message":"You must enter width!"}');
  });

  //check all query params
  it('should enter height if undefined', async () => {
    const response = await request
      .get('/api/images?filename=hn&width=500&height=')
      .query({ filename: 'img test', width: 10 });
    expect(response.text).toBe('{"message":"You must enter height!"}');
  });
  //check width type
  it('get', async () => {
    const response = await request
      .get('/api/images?filename=12&width=500&height="12"')
      .query({ filename: 'img test', width: 10 });
    expect(response.text).toBe('{"message":"width must be number!"}');
  });


});

// test resize request if height was string
