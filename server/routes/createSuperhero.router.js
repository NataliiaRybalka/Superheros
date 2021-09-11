const router = require('express').Router();

const { createSuperheroController: { createSuperhero } } = require('../controllers');
const { createSuperheroMiddlewar: { checkSuperheroData, checkSuperheroFiles } } = require('../middlewars');

router.post('/', 
  // checkSuperheroData,
  checkSuperheroFiles,
  createSuperhero
);

module.exports = router;