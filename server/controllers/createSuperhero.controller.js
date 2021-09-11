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

      const { photos, body: {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      } } = req;

      const [avatar] = photos;

      const newSuperhero = await Superhero.create({
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase
      });

      const { id } = newSuperhero;

      if (avatar) {
        const { finalPath, photoPath } = await createPhotoPath(avatar.name, id);
        await avatar.mv(finalPath);

        await Superhero.update({
          avatar: photoPath
        }, {
          where: {
            id
          }
        });
      };

      if (photos) {
        const allPhotosPath = [];

        for (const photo of photos) {
          const { finalPath, photoPath } = await createPhotoPath(photo.name, id);
          allPhotosPath.push(photoPath);
          await photo.mv(finalPath);
        }

        await Superhero.update({
          images: allPhotosPath
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
