import mongoose from "mongoose";

const quiz = {
    "question": "what is the full form of html?",
    "options": [
        {
            "key": "A",
            "text": "Hyper text"
        },
        {
            "key": "B",
            "text": "Hyper text markup language"
        },
        {
            "key": "C",
            "text": "Hyper text transfer protocol"
        },
        {
            "key": "D",
            "text": "none of these"
        }
    ],
    "correctKey": "B"
}

const optionSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            enum: ['A', 'B', 'C', 'D']
        },
        text: {
            type: String,
            required: true
        }
    }
)



const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    options: [optionSchema],
    correctKey: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
    }
});


export const Quiz = new mongoose.model("Quiz", quizSchema);