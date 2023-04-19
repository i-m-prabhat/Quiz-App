
const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

//get user 
router.get("/", UserController.default);

// create User
router.post("/create", UserController.create);

// update User 
router.put("/:id", UserController.update);
router.patch("/:id", UserController.updateOne);

//delete User 
router.delete("/:id", UserController.delete);

module.exports = router;
