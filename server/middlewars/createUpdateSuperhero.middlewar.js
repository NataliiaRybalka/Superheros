const { 
  fileConstants: { IMAGE_MAX_SIZE, IMAGE_MIMETYPES },
  responseCodes
} = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');
const { createSuperheroValidator: { createSuperhero } } = require('../validators');

module.exports = {
  checkSuperheroData: (req, res, next) => {
    try {
      const { error } = createSuperhero.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodes.AUTHENTICATION_ERROR,
          errorMessages.FIELD_NOT_FILLED.message(error.details[0].message),
          errorMessages.FIELD_NOT_FILLED.code
        )
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
            throw new ErrorHandler(
              responseCodes.Unsupported_Media_Type,
              errorMessages.WRONG_MIMETYPE.message,
              errorMessages.WRONG_MIMETYPE.code
            )
          }
          if (size > IMAGE_MAX_SIZE) {
            throw new ErrorHandler(
              responseCodes.Unsupported_Media_Type,
              errorMessages.WRONG_FILE_SIZE.message,
              errorMessages.WRONG_FILE_SIZE.code
            )
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
