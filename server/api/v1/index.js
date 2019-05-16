import express from 'express';
import cors from 'cors';
import ghPages from 'gh-pages';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDoc from './swagger.json';

import indexRoute from './routes/indexRoute';
import usersRoute from './routes/usersRoute';
import loanRoute from './routes/loanRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/api/v1/', usersRoute);
app.use('/api/v1/loans', loanRoute);

app.use('/api/v1/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
ghPages.publish('UI', () => {});

app.all('/api/v1/*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'The Endpoint requested doesn\'t exist',
  });
});

app.listen(port);

export default app;
