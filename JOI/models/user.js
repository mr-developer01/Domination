const mongoose = require("mongoose");
const Joi = require("joi")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        minLength: 3,
        required: true
    },
    name:{
        type: String,
        minLength: 3,
        required: true
    },
    age:{
        type: Number,
        min: 18,
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

function validateUserModel(data){
    let schema = Joi.object({
        username: Joi.string().min(3).required(),
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        age: Joi.string().max(3).required(),
        contact: Joi.number().required()
    })

    let {error} = schema.validate(data,  {convert: true})
    // console.log(resolvedAns.error?.message);
    return error;

}

let userModel = mongoose.model("User", userSchema)

module.exports = {validateUserModel, userModel};
