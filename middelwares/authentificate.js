import { HttpError } from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
const { SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET);

    const user = await User.findById(id);

    if (!user) {
      next(HttpError(401));
    }
    next();
  } catch (error) {
    next(HttpError(401));
  }
};
