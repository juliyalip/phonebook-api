import express from "express";
import cors from "cors";

import contactsRouter from "./routes/api/contacts.js";
import authRouter from "./routes/api/auth.js";


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static( "public"))

app.use("/api", authRouter)

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: "Page is Not found" });
});

app.use((error, req, res, next) => {
  const { status =500} = error;

res.status(status).json({
  error: error.message
  });
});

export default app;
