import express from "express";
import { validateBody } from "../../middelwares/validateBody.js";
import { authenticate } from "../../middelwares/authentificate.js";
import schemas from "../../model/userModel.js";
import cntrl from "../../controllers/user.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(schemas.registerSchema),
    cntrl.registration
);

authRouter.post("/login", validateBody(schemas.loginSchema), cntrl.login);

authRouter.get('/current', authenticate, cntrl.getCurrentUser)

authRouter.post("/logout", authenticate, cntrl.logout)

export default authRouter;
