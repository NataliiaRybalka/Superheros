const router = require('express').Router();

const { superheroesController: { getAllSuperheroes, getOneSuperhero } } = require('../controllers');

router.get('/', getAllSuperheroes);
// router.get('/:id', getOneSuperhero);

module.exports = router;