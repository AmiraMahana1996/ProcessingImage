import express, { Express, Request, Response, Application } from 'express';
import router from './api/routes';
import path from 'path';
import helmet from 'helmet';
import flash from 'connect-flash';
import session from 'express-session';
import fs from 'fs';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(bodyParser.json());
app.use(express.static(path.join('assets')));
app.use(express.static(path.join('views')));
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

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
      'img-src': ['\'self\'', 'https: data: blob:'],
    },
  })
);

app.listen(PORT,()=>{`Servert running on ${PORT}`});
export default app;
