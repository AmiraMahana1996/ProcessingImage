import nodeCashe from 'node-cache';
const cache = new nodeCashe();

const caching= (duration) => (req, res, next) => {
  
  if (req.method !== 'GET') {
    console.error('Cannot cache not GET method');
    return next();
  }

  const key = req.originalUrl;
  console.log(key);
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    /* eslint no-console: "error" */

        // custom console
    console.log(`cached hit for key ${key}`);
    res.send(cachedResponse);
  } else {
    console.log(`cached miss for key ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};
export default caching 
