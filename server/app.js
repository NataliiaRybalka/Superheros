require('dotenv').config();
const express = require('express');

const { envConstants: { HOST, PORT } } = require('./constants');

const app = express();

app.listen(PORT, HOST, () => {
  console.log(`App listen ${PORT}`);
});

