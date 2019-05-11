import express from 'express';
import cors from 'cors';

import indexRoute from './routes/indexRoute';
import usersRoute from './routes/usersRoute';
import loanRoute from './routes/loanRoute';

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/loans', loanRoute);

app.all('/api/v1/*', (req, res) => {
  res.status(400).json({
    status: 400,
    error: 'The Enpoint requested doesn\'t exist',
  });
});

app.listen(port);

export default app;
