const db = require('../database').getInstance();
const { createPhotoPathHelper: { createPhotoPath } } = require('../helpers');

module.exports = {
  createSuperhero: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const { body: {
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase,
        },
        photos,
      } = req;

      const newSuperhero = await Superhero.create({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase
      });

      const { id } = newSuperhero;

      if (photos) {
        const allPhotosPathArray = [];

        for (const photo of photos) {
          const { finalPath, photoPath } = await createPhotoPath(photo.name, id);
          allPhotosPathArray.push(photoPath);
          await photo.mv(finalPath);
        }

        await Superhero.update({
          avatar: allPhotosPathArray[0],
          images: allPhotosPathArray
        }, {
          where: {
            id
          }
        });
      };

      const superhero = await Superhero.findOne({
        where: {
          id
        }
      });

      res.json(superhero);
    } catch (e) {
      next(e);
    }
  }
};
