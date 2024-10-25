import express from "express";
import controller from "../../controllers/contacts.js";
const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);
contactsRouter.get("/:contactId", controller.getContactByID);
contactsRouter.post("/", controller.addNewContact);

contactsRouter.patch("/:contactId", async (req, res) => {});

export default contactsRouter;
