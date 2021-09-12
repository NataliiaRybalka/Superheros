const db = require('../database').getInstance();

module.exports = {
  getAllSuperheroes: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const limit = 5;
      const offset = limit * (req.query.page - 1);

      const allSuperheroes = await Superhero.findAll();
      const totalPages = Math.ceil(allSuperheroes.length / limit);

      const superheroesForOnePage = await Superhero.findAll({
        limit,
        offset 
      });

      res.json({ superheroesForOnePage, totalPages });
    } catch (e) {
      next(e);
    }
  },

  getOneSuperhero: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const oneSuperhero = await Superhero.findOne({
        where: {
          id: req.params.id
        }
      });

      res.json(oneSuperhero);
    } catch (e) {
      next(e);
    }
  },

  deleteSuperhero: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');
      
      const a = await Superhero.destroy({
        where: {
          id: req.params.id
        }
      });

      res.json('DELETED');
    } catch (e) {
      next(e);
    }
  }
};