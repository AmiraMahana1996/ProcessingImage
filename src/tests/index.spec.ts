import supertest from 'supertest';
import app from '../server';
import path from 'path';
import fs from 'fs';

// create a request object
const request = supertest(app);

// test resize request with name without width and height
describe('Test endpoint response', () => {
  it('Status Codes tests', async () => {
    const response = await request.get(
      '/api/images?filename=hn&width=500&height=500'
    );
    expect(response.status).toBe(200);
  });
  //check all query params
  it('should enter width if undefined', async () => {
    const response = await request.get(
      '/api/images?filename=hn&width=&height=45'
    );
    expect(response.status).toBe(404);
  });

  //check all query params
  it('should enter height if undefined', async () => {
    const response = await request.get(
      '/api/images?filename=hn&width=500&height='
    );

    expect(response.status).toBe(404);
  });
  //check all query params
  it('should enter filename if undefined', async () => {
    const response = await request.get(
      '/api/images?filename=&width=500&height=41'
    );
    expect(response.status).toBe(404);
  });
});

// test resizing image

describe('Test endpoint response', () => {
  it('test resizing image', async () => {
    // get most recent file added
    const getMostRecentFile = (dir) => {
      const files = orderReccentFiles(dir);
      return files.length ? files[0] : undefined;
    };
    const orderReccentFiles = (dir) => {
      return fs
        .readdirSync(dir)
        .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
        .map((file) => ({
          file,
          mtime: fs.lstatSync(path.join(dir, file)).mtime,
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    };
    const file = getMostRecentFile(
      `${path.resolve('./')}/assets/modified-images`
    );

    //start test
    await request
      .get('/api/images?filename=&width=500&height=41')
      .query({ filename: 'hn', width: 500, height: 41 });
    const existingFile = fs.existsSync(
      `${path.resolve('./')}/assets/modified-images/${file?.file}`
    );
    expect(existingFile).toBe(true);
  });
});
