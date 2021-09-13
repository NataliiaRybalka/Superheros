const { envConstants: { MySQL_DB, MySQL_USER, MySQL_USER_PASSWORD } } = require('../constants');

module.exports = {
  development: {
    "username": MySQL_USER,
    "password": MySQL_USER_PASSWORD,
    "database": MySQL_DB,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};

