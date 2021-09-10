const router = require('express').Router();

const db = require('../database').getInstance();

router.get('/', async (req, res) => {
  const Superhero = db.getModel('Superhoro');

  const allSuperheroes = await Superhero.findAll();

  res.json(allSuperheroes);
});

module.exports = router;