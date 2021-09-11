const { fileConstants: { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } } = require('../constants');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
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
      next();
    } catch (e) {
      next(e);
    }
  }
};
