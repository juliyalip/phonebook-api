import { Schema, model } from "mongoose";
import Joi from "joi";

export const validateContact = Joi.object({
  name: Joi.string().min(2).required(),
  number: Joi.number().min(5).required(),
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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
export const ContactSchema = model("contacts", contactSchema);
