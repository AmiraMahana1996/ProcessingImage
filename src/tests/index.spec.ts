import supertest from 'supertest';
import app from '../server';
import Joi from 'joi';
// create a request object
const request = supertest(app);
const Schema = Joi.object({
  name: Joi.string(),
  height: Joi.number().required(),
  width: Joi.number(),
});
// test resize request with name without width and height
describe('Test endpoint response', () => {
  it('post the / resize-img', async () => {
    const response = await request
      .post('/resize-img')
      .send({ name: 'img test' })
      .redirects(1);
    expect(response.status).toBe(404);
  });
});
// test resize request with name and width without height
describe('Test endpoint response', () => {
  it('post the / resize', async () => {
    const response = await request
      .post('/resize-img')
      .send({ name: 'img test', width: 10 });
    expect(response.status).toBe(404);
  });
});
// test resize request if width and height was string
describe('Test endpoint response', () => {
  it('post the / resize', async () => {
    const response = await request
      .post('/resize-img')
      .send({ name: 'img test', width: '10', height: '50' });
    expect(response.status).toBe(404);
  });
});
// test resize request if height was string
describe('Test endpoint response', () => {
  it('post the / resize', async () => {
    await request.post('/resize-img').send({ name: 'img test', width: 10 });
    expect(
      Schema.validate({ name: 'img test', width: 10 }).error?.message
    ).toBe('"height" is required');
  });
});
// test resize request if height was string
describe('Test endpoint response', () => {
  it('post the /resize-img', async () => {
    await request
      .post('/resize-img')
      .send({ name: 'img test', width: 50, height: 50 })
      .redirects(1);

    expect(
      Schema.validate({ name: 'img test', width: 50, height: 50 }).error
        ?.message
    ).toBe(undefined);
  });
});
