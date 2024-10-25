import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contactsRouter from './routes/api/contacts.js'
import "dotenv/config";

const PORT = process.env.PORT || 8800
const { BD_Host } = process.env;

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


const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res, next)=>{
    res.send('<h1>Contact page</h1>');
})

app.use("/api/contacts", contactsRouter);

app.use((req, res)=>{
    res.status(404).json({message: "Page is Not found"})
})

app.use((err, req, res, next) => { 
    const {status, message} = "Server is not found"
  res.status(status).json({
    message
  });
});


