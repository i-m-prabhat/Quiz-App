import mongoose from "mongoose";

const quizDb = () =>
{
    mongoose.connect('mongodb://0.0.0.0:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
    {
        console.log("connected with mongodb");
    }).catch((err) =>
    {
        console.log(err);
    })
}

export default quizDb;