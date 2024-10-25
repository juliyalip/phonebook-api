import express from "express";
import mongoose from "mongoose";

const  BD_Host = 'mongodb+srv://Julia:admin-Qwe12@cluster0.nvjz3.mongodb.net/'
const PORT = 8800

mongoose
.connect(BD_Host)
 .then(() => {
   console.log("connected to base");
   app.listen(PORT, () => {
     console.log("Connected");
   });
 })
 .catch((error) => {
   console.log("error", error.message);
   process.exit(1);
 });