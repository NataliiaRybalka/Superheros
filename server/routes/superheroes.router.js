const router = require('express').Router();

const { superheroesController: {
  getAllSuperheroes,
  getOneSuperhero,
  deleteSuperhero
} } = require('../controllers');

router.get('/', getAllSuperheroes);
router.get('/:id', getOneSuperhero);
router.delete('/:id', deleteSuperhero);

module.exports = router;