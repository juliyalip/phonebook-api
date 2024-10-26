import "dotenv/config";
import { ContactSchema, validateContact } from "../model/contactModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { wrapperComponent } from "../helpers/cntrlWrapper.js";

const getAllContacts = async (req, res) => {
  const data = await ContactSchema.find();

  res.json(data);
};

const getContactByID = async (req, res, next) => {
  const contacts = await ContactSchema.find();
  const contact = contacts.find(
    (contact) => contact.id === req.params.contactId
  );
  res.json(contact);
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const data = await ContactSchema.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts: wrapperComponent(getAllContacts),
  getContactByID: wrapperComponent(getContactByID),
  addNewContact,
};
