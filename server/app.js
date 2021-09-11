require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');

const { envConstants: { HOST, PORT } } = require('./constants');
const connection = require('./database');
const { createSuperheroRouter, superheroesRouter } = require('./routes');

connection.getInstance().setModels();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'static')));

app.use(fileupload({}));

app.use('/', superheroesRouter);
app.use('/create', createSuperheroRouter);

app.listen(PORT, HOST, () => {
  console.log(`App listen ${PORT}`);
});

