import express from "express";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("<h1>Contact page</h1>");
});

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page is Not found" });
});

//for all mistakes
app.use((error, req, res, next) => {
  const { status, message = "Server error" } = error;

  res.status(status).json({
    message,
  });
});

export default app;
