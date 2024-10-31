import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongusError } from "../helpers/handleMonguseError.js";

const add = Joi.object({
  name: Joi.string().min(2).required(),
  number: Joi.string().min(5).required(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    number: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongusError);

export const Contact = model("contacts", contactSchema);
export default {
  add,
  updateFavorite,
};
