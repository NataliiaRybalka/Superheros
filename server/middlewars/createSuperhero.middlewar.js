const { fileConstants: { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } } = require('../constants');
const { createSuperheroValidator: { createSuperhero } } = require('../validators');

module.exports = {
  checkSuperheroData: (req, res, next) => {
    try {
      const { error } = createSuperhero.validate(req.body.superheroesData);

      if (error) {
        throw new Error('All fields is required');
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkSuperheroFiles: (req, res, next) => {
    try {
      if (req.files) {
        const files = Object.values(req.files);
        const photos = [];
  
        for (let i = 0; i < files.length; i++) {
          const {name, size, mimetype} = files[i];
          
          if (!IMAGE_MIMETYPES.includes(mimetype)) {
            throw new Error('Wrong file format');
          }
          if (size > IMAGE_MAX_SIZE) {
            throw new Error(`File ${name} is too big`);
          }
  
          photos.push(files[i]);
        }
  
        req.photos = photos;
      }
      
      next();
    } catch (e) {
      next(e);
    }
  }
};
