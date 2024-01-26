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
//             });
//         } else
//         {
//             const skipAmount = Math.floor(Math.random() * totalQuizzes);
//             console.log("Skip Amount is :", skipAmount);
//             const quizzesData = await Quiz.find().select("-__v -correctKey").skip(skipAmount).limit(5).lean();

//             // Shuffle the order of options for each quiz
//             quizzesData.forEach(quiz =>
//             {
//                 quiz.options.sort(() => Math.random() - 0.5);
//             });

//             // Randomize the order of quizzes
//             quizzesData.sort(() => Math.random() - 0.5);

//             res.status(200).json(quizzesData);
//         }
//     } catch (err)
//     {
//         res.status(500).json({ error: err.message });
//     }
// };


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
            const quizzesData = await Quiz.aggregate([
                { $sample: { size: 5 } }, // Randomly select 5 documents
                { $project: { __v: 0, correctKey: 0 } } // Exclude __v and correctKey fields
            ]);

            // Shuffle the order of options for each quiz
            quizzesData.forEach(quiz =>
            {
                quiz.options.sort(() => Math.random() - 0.5);
            });

            res.status(200).json(quizzesData);
        }
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};


// {
//     userAnswers: [
//         { "id": "65b3bf5d66252031c80b9666", "userAnswer": "B" },
//         { "id": "65b3bf5d66252031c80b9667", "userAnswer": "C" },
//         { "id": "65b3bf5d66252031c80b9668", "userAnswer": "A" },
//         { "id": "65b3bf5d66252031c80b9669", "userAnswer": "D" },
//         { "id": "65b3bf5d66252031c80b966a", "userAnswer": "B" },
//     ]
// }

// const evaluateUserAnswers = async (req, res) =>
// {
//     try
//     {
//         const userAnswers = req.body.userAnswers; // Array of objects [{ id, userAnswer }]

//         if (!userAnswers || !Array.isArray(userAnswers))
//         {
//             return res.status(400).json({ error: 'Invalid request data' });
//         }

//         const quizIds = userAnswers.map(answer => answer.id);
//         const quizzes = await Quiz.find({ _id: { $in: quizIds } });

//         if (!quizzes || quizzes.length !== quizIds.length)
//         {
//             return res.status(404).json({ error: 'One or more quizzes not found' });
//         }

//         let score = 0;

//         for (let i = 0; i < quizzes.length; i++)
//         {
//             const quiz = quizzes[i];
//             const userAnswer = userAnswers.find(answer => answer.id === quiz._id.toString());

//             if (!quiz.correctKey || !userAnswer || quiz.correctKey !== userAnswer.userAnswer)
//             {
//                 // Incorrect answer
//                 // You may want to provide more details about the correct answer for each question
//                 // For simplicity, this example only increments the score for correct answers
//             } else
//             {
//                 // Correct answer
//                 score++;
//             }
//         }

//         res.status(200).json({ score });
//     } catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// }


// Validate user answers before evaluation
const validateUserAnswers = async (userAnswers) =>
{
    if (!Array.isArray(userAnswers))
    {
        throw new Error('Invalid userAnswers format. It should be an array.');
    }

    for (const answer of userAnswers)
    {
        if (!answer || typeof answer !== 'object' || !('id' in answer) || !('userAnswer' in answer))
        {
            throw new Error('Invalid answer format. Each answer should have "id" and "userAnswer" properties.');
        }

        const quiz = await Quiz.findById(answer.id);
        if (!quiz)
        {
            throw new Error(`Quiz with ID ${answer.id} not found.`);
        }

        const validOptions = quiz.options.map(option => option.key);
        if (!validOptions.includes(answer.userAnswer))
        {
            throw new Error(`Invalid userAnswer "${answer.userAnswer}" for quiz with ID ${answer.id}.`);
        }
    }
};



const evaluateUserAnswers = async (req, res) =>
{
    try
    {
        const userAnswers = req.body.userAnswers; // Array of objects [{ id, userAnswer }]

        await validateUserAnswers(userAnswers);
        // res.status(200).json({ message: 'Validation successful' });

        const quizIds = userAnswers.map(answer => answer.id);
        const quizzes = await Quiz.find({ _id: { $in: quizIds } });

        if (!quizzes || quizzes.length !== quizIds.length)
        {
            return res.status(404).json({ error: 'One or more quizzes not found' });
        }

        let score = 0;

        for (let i = 0; i < quizzes.length; i++)
        {
            const quiz = quizzes[i];
            const userAnswer = userAnswers.find(answer => answer.id === quiz._id.toString());

            if (!quiz.correctKey || !userAnswer || quiz.correctKey !== userAnswer.userAnswer)
            {
                // Incorrect answer
                // You may want to provide more details about the correct answer for each question
                // For simplicity, this example only increments the score for correct answers
            } else
            {
                // Correct answer
                score++;
            }
        }

        res.status(200).json({ score });

    } catch (error)
    {
        res.status(400).json({ error: error.message });
    }
}



export
{
    createQuiz,
    getAllQuiz,
    getQuizById,
    updateQuizById,
    deleteQuizById,
    getRandomQuizzes,
    evaluateUserAnswers
}


// filter
// const fromDate = new Date('2024-01-01T00:00:00Z'); // Replace with your start date
// const toDate = new Date('2024-01-31T23:59:59Z'); // Replace with your end date

// const otherMatchCriteria = {
//     // Add other match criteria here
//     // Example: { status: 'active', category: 'technology' }
// };

// const pipeline = [
//     {
//         $match: {
//             createdAt: {
//                 $gte: fromDate,
//                 $lte: toDate,
//             },
//             ...otherMatchCriteria,
//         },
//     },
//     // Other aggregation stages as needed
//     // Example: { $project: { _id: 0, name: 1, createdAt: 1 } }
// ];

// try
// {
//     const filteredData = await YourModel.aggregate(pipeline);
//     res.status(200).json(filteredData);
// } catch (err)
// {
//     res.status(500).json({ error: err.message });
// }
