const db = require('../database').getInstance();

module.exports = {
  getAllSuperheroes: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const allSuperheroes = await Superhero.findAll();

      res.json(allSuperheroes);
    } catch (e) {
      next(e);
    }
  },

  getOneSuperhero: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const oneSuperhero = await Superhero.findOne({
        where: {
          id: req.query.id
        }
      });

      res.json(oneSuperhero);
    } catch (e) {
      next(e);
    }
  }
};