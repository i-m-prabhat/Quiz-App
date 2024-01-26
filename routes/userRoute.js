import express from "express";
import UserController from "../controller/userController.js";
import { createQuiz, deleteQuizById, evaluateUserAnswers, getAllQuiz, getQuizById, getRandomQuizzes, updateQuizById } from "../controller/QuizController.js";

const router = express.Router();
//get user 
router.get("/", UserController.default);

// create User
router.post("/create", UserController.create);

// update User 
router.put("/:id", UserController.update);
router.patch("/:id", UserController.updateOne);

//delete User 
router.delete("/:id", UserController.delete);


// quiz routes 
router.route("/quizzes").get(getAllQuiz).post(createQuiz);
router.route("/quizzes/:id").get(getQuizById).put(updateQuizById).delete(deleteQuizById);
router.route("/random/quizzes").get(getRandomQuizzes);
router.route("/evaluate/quizzes").post(evaluateUserAnswers);

export default router;
