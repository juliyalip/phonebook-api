import express from "express";
import { validateBody } from "../../middelwares/validateBody.js";
import { authenticate } from "../../middelwares/authentificate.js";
import { upload } from "../../middelwares/upload.js";
import schemas from "../../model/userModel.js";
import cntrl from "../../controllers/user.js";

const authRouter = express.Router();

authRouter.get('/current', authenticate, cntrl.getCurrentUser)
authRouter.post(
    "/register",
    validateBody(schemas.registerSchema),
    cntrl.registration
);
authRouter.post("/login", validateBody(schemas.loginSchema), cntrl.login);
authRouter.post("/logout", authenticate, cntrl.logout)
authRouter.patch("/upload", authenticate,  upload.single("avatar"), cntrl.uploadAvatar)

export default authRouter;
