const router = require('express').Router();

const { createSuperheroController } = require('../controllers');
const { fileMiddlewar } = require('../middlewars');

router.post('/', fileMiddlewar.checkFiles, createSuperheroController.createSuperhero);

module.exports = router;