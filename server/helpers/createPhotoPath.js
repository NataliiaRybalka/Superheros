const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  createPhotoPath: async (filename, id) => {
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
  }
};
