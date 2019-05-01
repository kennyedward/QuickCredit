import express from 'express';

const app = express();
const port = process.env.PORT || 7000;

app.use('/', (req, res) => {
  res.json({
    status: 200,
    message: 'You\'re welcome',
  });
});

app.listen(port);

export default app;
