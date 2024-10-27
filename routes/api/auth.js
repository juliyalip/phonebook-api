import express from 'express';
import { validateBody } from '../../middelwares/validateBody.js';
import schemas from '../../model/userModel.js';
import controller from '../../controllers/user.js'

const authRouter = express.Router()

authRouter.post("/register", validateBody(schemas.registerSchema), controller.addNewUser)

export default authRouter