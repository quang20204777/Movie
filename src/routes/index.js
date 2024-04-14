const express = require('express');
const { userRouter } = require('./user.router.js');
const { cinemaRouter } = require('./cinema.router.js');
const { movieRouter } = require('./movie.router.js');
const { showtimeRouter } = require('./showtime.router.js');
const { reservationRouter } = require('./reservation.router.js');
const rootRouter = express.Router();

rootRouter.use('/', userRouter);
rootRouter.use('/', cinemaRouter);
rootRouter.use('/', movieRouter);
rootRouter.use('/', showtimeRouter);
rootRouter.use('/', reservationRouter);

module.exports = { rootRouter };
