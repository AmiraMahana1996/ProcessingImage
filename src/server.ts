import express, { Request, Response } from 'express';
import router from './api/routes';
import path from 'path';
import helmet from 'helmet';
import flash from 'connect-flash';
import session from 'express-session';

import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join('assets')));

app.use(express.json({ type: 'application/json' }));

app.use(
  session({
    secret: 'flashblog',
    saveUninitialized: true,
    resave: true,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(flash());

// application routing

app.use(router);

app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data: blob:'],
    },
  })
);

app.listen(PORT, () => {
  console.log(`Servert running on ${PORT}`);
});
export default app;
