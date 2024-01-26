import express from "express";
import IndexController from '../controller/IndexController.js';
const router = express.Router();

router.get('/', IndexController.default);

export default router;
