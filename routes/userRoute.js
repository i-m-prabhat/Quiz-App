import express from "express";
import UserController from "../controller/userController.js";
import { createQuiz, deleteQuizById, getAllQuiz, getQuizById, updateQuizById } from "../controller/QuizController.js";

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

export default router;
