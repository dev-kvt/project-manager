import express from 'express';
const app = express();


app.get("/", (req, res) => {
    res.send("Welcome Brother!");
}); 


export default app;

