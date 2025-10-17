import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
import cors from "cors";


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dotenv.config({
    path:"./.env"
});



console.log("This is the start of a very good project");
// listening page , this is just a listening page for the server,port and env
