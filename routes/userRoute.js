import express from "express";
import UserController from "../controller/userController.js";

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

export default router;
