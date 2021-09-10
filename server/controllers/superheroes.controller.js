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

  getOneSuperhero: (req, res, next) => {
    try {
      
    } catch (e) {
      next(e);
    }
  }
};