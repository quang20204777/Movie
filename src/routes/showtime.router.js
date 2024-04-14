const express = require('express');
const { adminAuth } = require('../middlewares/auth');
const {createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtimeById,
  deleteShowtimeById,} = require('../controllers/showtime.controller');

const showtimeRouter = new express.Router();

showtimeRouter.post('/showtimes', adminAuth, createShowtime);

showtimeRouter.get('/showtimes', getAllShowtimes);

showtimeRouter.get('/showtimes/:id', getShowtimeById);

showtimeRouter.patch('/showtimes/:id', adminAuth, updateShowtimeById);

showtimeRouter.delete('/showtimes/:id', adminAuth, deleteShowtimeById);

module.exports = {showtimeRouter};
