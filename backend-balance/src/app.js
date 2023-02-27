import express from 'express';
import authRouter from "./routes/auth.routes.js"
import cors from 'cors'
import cookieParser from "cookie-parser";
import sessions  from 'express-session';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

mongoose.Promise = Promise
mongoose.connect('mongodb://127.0.0.1:27017/angulardb')
.then(() => console.log('mongoose up') )




const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:4200/*'
}));

app.set('trust proxy', 1) 
app.use(sessions({
    genid: function(req)  {
        return uuidv4();},
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());

app.use("/api/auth", authRouter);


app.listen(3000, () => console.log("listening on port 3000"));