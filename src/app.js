import express from 'express';
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import healthcheckrouter from './routes/healthcheck.routes.js';
import authrouter from './routes/auth.routes.js';

app.use(express.json({limit: '23kb'}));
app.use(cookieParser());
//cors configuration 
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
    
}))
app.use("/api/v1/healthcheck", healthcheckrouter);
app.use("/api/v1/auth", authrouter);


app.get("/", (req, res) => {
    res.send("Welcome Brother!");
}); 

export default app;

