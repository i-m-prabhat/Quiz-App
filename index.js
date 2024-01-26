import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from "./app.js";
import quizDb from "./config/database.js"
import mongoose from "mongoose";
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
import config from "./config/config.js"
const connectionURL = process.env.DB_URL || config.database.mongodb.local


server.listen(PORT, () =>
{
    // quizDb();
    console.log('Server Started at port : ' + PORT);
    mongoose.connect(connectionURL, config.database.mongodb.confingRules).then((conn) =>
    {
        console.log("connected with mongodb on", connectionURL);
        // console.log(conn);
    }).catch((err) =>
    {
        console.log(err);
    })
})