import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongusError } from "../helpers/handleMonguseError.js";

const emailRegexp =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: ""
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongusError);

export const User = model("users", userSchema);

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(4).required(),
});

export default {
  registerSchema,
  loginSchema,
};
