import express from 'express';
import router from './api/routes';
import path from 'path';

import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join('assets')));

app.use(express.json({ type: 'application/json' }));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// application routing

app.use(router);

app.listen(PORT, () => {
  console.log(`Servert running on ${PORT}`);
});
export default app;
