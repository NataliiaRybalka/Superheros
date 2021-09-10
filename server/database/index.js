const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const { envConstants: { MySQL_DB, MySQL_USER, MySQL_USER_PASSWORD } } = require('../constants/');

module.exports = (() => {
  let instance;

  const initConnection = () => {
    const client = new Sequelize(MySQL_DB, MySQL_USER, MySQL_USER_PASSWORD, { dialect: 'mysql' });
    console.log(client);
    const models = {};
    const modelsDir = path.join(process.cwd(), 'database', 'models');

    const readAndSetModels = () => {
      fs.readdir(modelsDir, (err, files) => {
        files.forEach(file => {
          const [modelName] = file.split('.');
          const modelFile = require(path.join(modelsDir, file));

          models[modelName] = modelFile(client);
        });
      });
    };

    return {
      getModel: (modelName) => models[modelName],
      setModels: () => readAndSetModels()
    }
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = initConnection();
      }

      return instance;
    }
  }
})();