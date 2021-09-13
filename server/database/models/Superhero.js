const { DataTypes } = require('sequelize');

module.exports = (client) => {
  const Superhero = client.define(
    'Superhero',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nickname: {
        type: DataTypes.STRING,
        required: true
      },
      real_name: {
        type: DataTypes.STRING,
      },
      origin_description: {
        type: DataTypes.STRING
      },
      superpowers: {
        type: DataTypes.STRING
      },
      catch_phrase: {
        type: DataTypes.STRING
      },
      avatar: {
        type: DataTypes.STRING
      },
      images: {
        type: DataTypes.JSON
      }
    },
    {
      tableName: 'superheroes',
      timestamps: false
    }
  );

  return Superhero;
};
