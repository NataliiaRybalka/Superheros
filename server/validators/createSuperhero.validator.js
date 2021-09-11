const Joi = require('joi');

module.exports = {
  createSuperhero: Joi.object().keys({
    nickname: Joi.string().required(),
    real_name: Joi.string().required(),
    origin_description: Joi.string().required(),
    superpowers: Joi.string().required(),
    catch_phrase: Joi.string().required()
  })
};
