import express from "express";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";
import authRouter from "./routes/api/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter)

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page is Not found" });
});

app.use((error, req, res, next) => {
  const { status =500, message = "Server error" } = error;

res.status(status).json({
    message,
  });
});

export default app;
