import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import fs from 'fs/promises'
import cloudinary from "./config/cloudinary.js";
import { optimazedImage } from "../helpers/optimazedImage.js"; 

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
  res.json({ token: token })
}

const getCurrentUser = async (req, res) => {
  const { name, email, avatar } = req.user;
  res.json({ name, email, avatar })
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' })
  res.json({
    message: "Logout succes"
  })
}


const uploadAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "The file was not uploaded");
  }

  const { _id } = req.user;

  try {
    const tempPath = await optimazedImage(req.file.path);

      const { secure_url: avatar, public_id: idCloudAvatar } = await cloudinary.uploader.upload(tempPath, {
      folder: "avatars",
      transformation: { width: 150, crop: 'fill' }
    });

       await fs.unlink(tempPath);

      const user = await User.findById(_id);
    const oldAvatarId = user?.idCloudAvatar;

     if (oldAvatarId) {
      await cloudinary.uploader.destroy(oldAvatarId);
    }

       await User.findByIdAndUpdate(_id, { avatar, idCloudAvatar }, { new: true });

    res.status(200).json({ avatar });

  } catch (error) {
    console.error( error);
    }
};


export default {
  registration: wrapperComponent(registration),
  login: wrapperComponent(login),
  getCurrentUser: wrapperComponent(getCurrentUser),
  logout: wrapperComponent(logout),
  uploadAvatar: wrapperComponent(uploadAvatar)
};


//    const uploadAvatar = async (req, res) => { 
//      if (!req.file) {
//        throw HttpError(400, "The file was not downloaded");
//      }
//    
//      const { _id } = req.user;
//      const { path: tempPath } = req.file;
//      const user = await User.findById(_id);
//    
//      const oldAvatarId = user?.idCloudAvatar;
//    
//        const { secure_url: avatar, public_id: idCloudAvatar } = await cloudinary.uploader.upload(tempPath, {
//        folder: "avatars",
//        transformation: { width: 150, crop: 'fill' }
//      });
//    
//        await fs.unlink(tempPath);
//    
//      if (oldAvatarId) {
//        await cloudinary.uploader.destroy(oldAvatarId);
//      }
//    
//      const updatedUser = await User.findByIdAndUpdate(
//        _id,
//        { avatar, idCloudAvatar },
//        { new: true } 
//      );
//    
//      res.status(200).json({ avatar: updatedUser.avatar });
//    };