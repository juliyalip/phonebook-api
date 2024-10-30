import "dotenv/config";
import { Contact } from "../model/contactModel.js";
import { wrapperComponent } from "../helpers/cntrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, "--createdAp -updatedAt", { skip, limit }).populate("owner", "name email");
  res.json(data);
};

const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId)
  res.json(contact);
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, (req.body))
  res.json(data)

};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndDelete(contactId)

  res.json({
    "message": "delete succes"
  })
}

export default {
  getAllContacts: wrapperComponent(getAllContacts),
  getContactByID: wrapperComponent(getContactByID),
  addNewContact: wrapperComponent(addNewContact),
  updateContact: wrapperComponent(updateContact),
  deleteContact: wrapperComponent(deleteContact)
};
