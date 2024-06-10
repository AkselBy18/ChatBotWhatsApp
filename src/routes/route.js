const express = require('express');
const router = express.Router();
const api = require('../controller/api.controller');

router
    .get("/", api.verify)
    .post("/", api.recive)

module.exports = router;