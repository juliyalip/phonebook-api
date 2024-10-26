import mongoose from "mongoose";
import "dotenv/config";

import app from "./app.js";

const PORT = process.env.PORT || 8800;
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
