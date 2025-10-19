import express from 'express';
const app = express();
import cors from "cors";


app.use(express.json({limit: '23kb'}));


app.get("/", (req, res) => {
    res.send("Welcome Brother!");
}); 

//cors configuration 
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
    
}))
import healthcheckrouter from './routes/healthcheck.routes.js';
app.use("/api/v1/healthcheck", healthcheckrouter);
import authrouter from './routes/auth.routes.js';
app.use("/api/v1/auth", authrouter);



export default app;

