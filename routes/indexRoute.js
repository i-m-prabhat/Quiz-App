
const express = require("express");
const router = express.Router();
const IndexController = require('../controller/IndexController');

router.get('/',IndexController.default);

module.exports = router;
