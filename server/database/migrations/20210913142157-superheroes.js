module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('superheroes', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nickname: {
        type: Sequelize.DataTypes.STRING,
        required: true
      },
      real_name: {
        type: Sequelize.DataTypes.STRING,
      },
      origin_description: {
        type: Sequelize.DataTypes.TEXT
      },
      superpowers: {
        type: Sequelize.DataTypes.STRING
      },
      catch_phrase: {
        type: Sequelize.DataTypes.STRING
      },
      avatar: {
        type: Sequelize.DataTypes.STRING
      },
      images: {
        type: Sequelize.DataTypes.JSON
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('superheroes');
  }
};
