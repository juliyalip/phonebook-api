import express from "express";
import controller from "../../controllers/contacts.js";
import { validateBody } from "../../middelwares/validateBody.js";
import { authenticate } from "../../middelwares/authentificate.js";
import schemas from "../../model/contactModel.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate,  controller.getAllContacts);
contactsRouter.get("/:contactId", authenticate,  controller.getContactByID);
contactsRouter.post("/", authenticate, validateBody(schemas.add),  controller.addNewContact);
contactsRouter.patch("/:contactId", authenticate,  async (req, res) => {});

export default contactsRouter;
