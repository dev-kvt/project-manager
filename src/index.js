import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import cors from "cors";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} 🚀`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database", error);
    process.exit(1);
  });

console.log("This is the start of a very good project");
// listening page , this is just a listening page for the server,port and env variables 


