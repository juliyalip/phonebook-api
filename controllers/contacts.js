import "dotenv/config";
import  { Contact} from "../model/contactModel.js";
// import { HttpError } from "../helpers/HttpError.js";
import { wrapperComponent } from "../helpers/cntrlWrapper.js";

const getAllContacts = async (req, res) => {
  const {_id: owner}= req.user;
  const {page= 1, limit =3} = req.query;
  const skip = (page -1)* limit;
  const data = await Contact.find({owner}, "--createdAp -updatedAt", {skip, limit}).populate("owner", "name email");
  res.json(data);
};

const getContactByID = async (req, res, next) => {
 const {contactId}= req.params;
const contact = await Contact.findById(contactId)
  res.json(contact);
};

const addNewContact = async (req, res) => {
  const {_id: owner} = req.user
     const data = await Contact.create({...req.body, owner});
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
