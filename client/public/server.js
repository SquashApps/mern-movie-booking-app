const path = require('path');
const express = require('express');
const compression = require('compression');

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '0.0.0.0';

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, '/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, host, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);
  // eslint-disable-next-line no-console
  console.info(`Ready on: ${host}:${port}`);
});
