const express = require('express');
const { createCinema } = require('../controller/cinema.controller.js');
const { adminAuth } = require('../middlewares/auth.js');
const cinemaRouter = express.Router();

cinemaRouter.post('/createCinema', adminAuth,createCinema);

module.exports = { cinemaRouter };
