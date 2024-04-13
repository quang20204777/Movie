const express = require('express');
const {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtimeById,
  deleteShowtimeById,
} = require('../controller/showtime.controller.js');
const { adminAuth } = require('../middlewares/auth.js');
const showtimeRouter = express.Router();

showtimeRouter.post('/createShowtime', adminAuth, createShowtime);
showtimeRouter.get('/getAllShowtime', getAllShowtimes);
showtimeRouter.get('/getShowtimeById/:id', getShowtimeById);
showtimeRouter.put('/updateShowtimeById/:id', adminAuth, updateShowtimeById);
showtimeRouter.delete('/deleteShowtimeById/:id', adminAuth, deleteShowtimeById);

module.exports = { showtimeRouter };
