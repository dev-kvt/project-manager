import dotenv from "dotenv";
import express from "express";
import app from "./app.js";

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dotenv.config({
    path:"./.env"
});



console.log("This is the start of a very good project");
