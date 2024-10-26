import express from "express";
import controller from "../../controllers/contacts.js";
import { validateBody } from "../../middelwares/validateBody.js";
import schemas from "../../model/contactModel.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);
contactsRouter.get("/:contactId", controller.getContactByID);
contactsRouter.post("/", validateBody(schemas.add),  controller.addNewContact);
contactsRouter.patch("/:contactId", async (req, res) => {});

export default contactsRouter;
