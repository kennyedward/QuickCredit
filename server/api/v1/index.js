import express from 'express';

import indexRoute from './routes/indexRoute';

const app = express();
const port = process.env.PORT || 7000;

app.use('/', indexRoute);

app.listen(port);

export default app;
