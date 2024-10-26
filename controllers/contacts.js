import "dotenv/config";
import  { Contact} from "../model/contactModel.js";
// import { HttpError } from "../helpers/HttpError.js";
import { wrapperComponent } from "../helpers/cntrlWrapper.js";

const getAllContacts = async (req, res) => {
  const data = await Contact.find();
  res.json(data);
};

const getContactByID = async (req, res, next) => {
  const contacts = await Contact.find();
  const contact = contacts.find(
    (contact) => contact.id === req.params.contactId
  );
  res.json(contact);
};

const addNewContact = async (req, res, next) => {
     const data = await Contact.create(req.body);
    res.status(201).json(data);
};

//const updateContact = async (req, res, next) => {
// try {
// const { error } = schemas.add.validate(req.body);
//    if (error) {
 //     throw new HttpError(400, error.message);
 //   }
 //   const { contactId } = req.params;
 // } catch (error) {
 //   next(error);
 // }
// };

export default {
  getAllContacts: wrapperComponent(getAllContacts),
  getContactByID: wrapperComponent(getContactByID),
  addNewContact: wrapperComponent(addNewContact),

};
