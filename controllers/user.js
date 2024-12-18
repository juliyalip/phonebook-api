import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { User } from "../model/userModel.js";
import { wrapperComponent } from "../helpers/cntrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

const { SECRET } = process.env

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ name: newUser.name, email: newUser.email });
};

const login = async (req, res) => {

  const { email, password } = await req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "E-mail or password is invalide")
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "E-mail or password is invalide")
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET, { expiresIn: "6h" })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({token: token})
}

const getCurrentUser = async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email })
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' })
  res.json({
    message: "Logout succes"
  })
}

export default {
  registration: wrapperComponent(registration),
  login: wrapperComponent(login),
  getCurrentUser: wrapperComponent(getCurrentUser),
  logout: wrapperComponent(logout)
};
