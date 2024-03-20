const Joi = require('joi');

const scoreSchema = Joi.object({
  score: Joi.number().required().min(50).max(500),
  userId: Joi.string().required()
})

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.date().required(),
  phone: Joi.number().required(),
  otp: Joi.number().required()
});

module.exports = {
  scoreSchema,
  userSchema
}