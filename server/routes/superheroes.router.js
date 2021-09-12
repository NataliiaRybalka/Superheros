const router = require('express').Router();

const { superheroesController: {
  deleteSuperhero,
  getAllSuperheroes,
  getOneSuperhero,
  updateSuperhero
} } = require('../controllers');
const { createUpdateSuperheroMiddlewar: { checkSuperheroFiles } } = require('../middlewars');

router.get('/', getAllSuperheroes);
router.get('/:id', getOneSuperhero);

router.put('/:id', checkSuperheroFiles, updateSuperhero);

router.delete('/:id', deleteSuperhero);

module.exports = router;