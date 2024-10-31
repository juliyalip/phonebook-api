import express from "express";
import cntrl from "../../controllers/contacts.js";
import { validateBody } from "../../middelwares/validateBody.js";
import { isValidId } from "../../middelwares/isValidId.js";
import { authenticate } from "../../middelwares/authentificate.js";
import schemas from "../../model/contactModel.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, cntrl.getAllContacts);
contactsRouter.get(
  "/:contactId",
  authenticate,
  isValidId,
  cntrl.getContactByID
);
contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.add),
  cntrl.addNewContact
);
contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.add),
  cntrl.updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavorite),
  cntrl.updatePropertyFavorite
);
contactsRouter.delete(
  "/:contactId",
  authenticate,
  isValidId,
  cntrl.deleteContact
);

export default contactsRouter;
