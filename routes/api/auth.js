import express from 'express';
import { validateBody } from '../../middelwares/validateBody.js';

import schemas from '../../model/userModel.js';
import cntrl from '../../controllers/user.js'

const authRouter = express.Router()

authRouter.post("/register", validateBody(schemas.registerSchema), cntrl.registration)

authRouter.post("/login", validateBody(schemas.loginSchema), cntrl.login)

export default authRouter