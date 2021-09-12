const { responseCodes } = require('../constants');
const db = require('../database').getInstance();
const { createPhotoPathHelper: { createPhotoPath } } = require('../helpers');

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

      res.status(responseCodes.NO_CONTENT).json('DELETED');
    } catch (e) {
      next(e);
    }
  },

  updateSuperhero: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const { body: {
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase,
          avatar,
          deleteImages
        },
        params: {
          id
        },
        photos,
      } = req;

      const superhero = await Superhero.findOne({
        attributes: ['images']
      }, {
        where: {
          id
        }
      });

      const allPhotosPathArray = [...superhero.images];

      if (photos) {
        for (const photo of photos) {
          const { finalPath, photoPath } = await createPhotoPath(photo.name, id);
          allPhotosPathArray.push(photoPath);
          await photo.mv(finalPath);
        }

        await Superhero.update({
          images: allPhotosPathArray
        }, {
          where: {
            id
          }
        });
      }

      let arrayWithoutDeletedImages;
      if (deleteImages) {
        const arrayDeleteImages = deleteImages.split(',');
        arrayWithoutDeletedImages = allPhotosPathArray.filter(onePath => !arrayDeleteImages.includes(onePath));
      }

      await Superhero.update({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        avatar,
        images: arrayWithoutDeletedImages
      }, {
        where: {
          id
        }
      });

      const updatedSuperhero = await Superhero.findOne({
        where: {
          id
        }
      });

      res.status(responseCodes.CREATED).json(updatedSuperhero);
    } catch (e) {
      next(e);
    }
  }
};