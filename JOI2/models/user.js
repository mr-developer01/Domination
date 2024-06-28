const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  age: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    min: 18,
    max: 120,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: Number,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email format is invalid"],
  },
});

function validateModel(data) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).trim().required(),

    name: Joi.string().min(2).max(50).trim().required(),

    age: Joi.number().integer().min(18).max(120).required(),

    contact: Joi.number().required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu'] } })
      .required().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu)$/)
      .messages({
          'any.required': 'Email is required.',
          'string.email': 'Please enter a valid email address. Example: example@email.com or example@email.net or example@email.org or example@email.edu',  
          'string.pattern.base': 'Please enter a valid email address. Example: example@email.comss'
      }),
  });

  const { error } = schema.validate(data);

  return error;
}

module.exports.userModel = mongoose.model("user", userSchema);
module.exports.validateModel = validateModel;
