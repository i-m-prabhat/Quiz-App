require("dotenv").config();
const http = require('http');
const app = require('./app');
const quizDb = require("./config/database")
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

quizDb();

server.listen(PORT, () =>
{
    console.log('Server Started at port : ' + PORT);
})