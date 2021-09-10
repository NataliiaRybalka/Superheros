require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { envConstants: { HOST, PORT } } = require('./constants');
const connection = require('./database');
const { superherosRouter } = require('./routes');

connection.getInstance().setModels();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', superherosRouter);

app.listen(PORT, HOST, () => {
  console.log(`App listen ${PORT}`);
});

