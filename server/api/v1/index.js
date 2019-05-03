import express from 'express';

import indexRoute from './routes/indexRoute';
import usersRoute from './routes/usersRoute';

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/api/v1/users', usersRoute);

app.listen(port);

export default app;
