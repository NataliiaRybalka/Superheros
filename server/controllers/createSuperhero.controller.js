const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const db = require('../database').getInstance();

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  createSuperhero: async (req, res, next) => {
    try {
      const Superhero = db.getModel('Superhero');

      const { photos, body: {superheroesData : {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      }} } = req;

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
          allPhotosPath.push(photoPath);
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

const createPhotoPath = async (filename, id) => {
  const pathWithoutStatic = path.join('superheroes', id.toString());
  const uploadPath = path.join(process.cwd(), 'static', pathWithoutStatic);
  const fileExtension = filename.split('.').pop();
  const photoName = `${uuid()}.${fileExtension}`;
  const finalPath = path.join(uploadPath, photoName);
  const photoPath = path.join(pathWithoutStatic, photoName);

  await mkdirPromise(uploadPath, { recursive: true });

  return {
    finalPath,
    photoPath
  }
};
