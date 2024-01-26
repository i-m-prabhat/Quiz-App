import { Quiz } from "../model/Quiz.js";


// Create a new quiz
const createQuiz = async (req, res) =>
{
    try
    {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

// Get all quizzes
const getAllQuiz = async (req, res) =>
{
    try
    {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific quiz by ID
const getQuizById = async (req, res) =>
{
    try
    {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz)
        {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

// Update a quiz by ID
const updateQuizById = async (req, res) =>
{
    try
    {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quiz)
        {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

// Delete a quiz by ID
const deleteQuizById = async (req, res) =>
{
    try
    {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz)
        {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(204).end();
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

// get 5 random quiz 
// const getRandomQuizzes = async (req, res) =>
// {
//     try
//     {
//         let totalQuizzes = await Quiz.countDocuments();
//         console.log(totalQuizzes);
//         if (totalQuizzes < 10)
//         {
//             res.status(404).json({
//                 message: "Not enough questions in the database to create 5 random questions"
//             })
//         } else
//         {
//             const skipAmount = Math.floor(Math.random() * totalQuizzes);
//             console.log("Skip Amount is :", skipAmount);
//             // const quizzesData = await Quiz.find().sort(() => .5 - Math.random()).skip(skipAmount).limit(5);
//             const quizzesData = await Quiz.find().select("-__v -correctKey").skip(skipAmount).limit(5).lean();

//             // Randomize the order of quizzes
//             quizzesData.sort(() => Math.random() - 0.5);

//             res.status(200).json(quizzesData);
//         };
//     } catch (err)
//     {
//         res.status(500).json({ error: err.message });
//     };
// }


const getRandomQuizzes = async (req, res) =>
{
    try
    {
        let totalQuizzes = await Quiz.countDocuments();
        console.log(totalQuizzes);
        if (totalQuizzes < 10)
        {
            res.status(404).json({
                message: "Not enough questions in the database to create 5 random questions"
            });
        } else
        {
            const skipAmount = Math.floor(Math.random() * totalQuizzes);
            console.log("Skip Amount is :", skipAmount);
            const quizzesData = await Quiz.find().select("-__v -correctKey").skip(skipAmount).limit(5).lean();

            // Shuffle the order of options for each quiz
            quizzesData.forEach(quiz =>
            {
                quiz.options.sort(() => Math.random() - 0.5);
            });

            // Randomize the order of quizzes
            quizzesData.sort(() => Math.random() - 0.5);

            res.status(200).json(quizzesData);
        }
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};



export
{
    createQuiz,
    getAllQuiz,
    getQuizById,
    updateQuizById,
    deleteQuizById,
    getRandomQuizzes
}