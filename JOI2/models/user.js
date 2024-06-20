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

    contact: Joi.number().required().messages({
      "any.required": "Age is required.",
      "number.integer": "Age must be an integer.",
      "number.min": "Age must be at least 18.",
      "number.max": "Age cannot exceed 120.",
    }),

    email: Joi.string()
      .regex(
        /^(?=.{1,64}@)[A-Za-z0-9\.-]+@(?:[A-Za-z0-9-]+\.)+(com|net|edu)$/,
        "Invalid email format. Please enter a valid email address."
      )
      .required("Email is required")
      .custom((value, helpers) => {
        const isValidEmail = checkEmail(value);
        if (!isValidEmail) {
          return helpers.error("any.invalid", "Email is not recognized.");
        }
        // If everything is okay, return the value unchanged
        return value;
      }, "Custom Email Validation"),
  });

  const { error } = schema.validate(data);

  return error;
}

module.exports.userModel = mongoose.model("user", userSchema);
module.exports.validateModel = validateModel;
