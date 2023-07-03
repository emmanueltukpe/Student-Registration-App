import express from 'express';
import env from '../common/env';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
