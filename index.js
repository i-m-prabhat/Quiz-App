require("dotenv").config();
const http = require('http');
const app = require('./app');
const quizDb = require("./config/database")
const mongoose = require("mongoose");
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const config = require("./config/config.json")
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