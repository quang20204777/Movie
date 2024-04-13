const express = require('express');
const { userRouter } = require('./user.router.js');
const { cinemaRouter } = require('./cinema.router.js');
const { movieRouter } = require('./movie.router.js');
const { showtimeRouter } = require('./showtime.router.js');
const { reservationRouter } = require('./reservation.router.js');
const rootRouter = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/cinema', cinemaRouter);
rootRouter.use('/movie', movieRouter);
rootRouter.use('/showtime', showtimeRouter);
rootRouter.use('/reservation', reservationRouter);

module.exports = { rootRouter };
