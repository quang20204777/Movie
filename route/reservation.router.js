const express = require('express');
const {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationCheckinById,
  updateReservationById,
  deleteReservationById,
} = require('../controller/reservation.controller.js');
const { userAuth, adminAuth } = require('../middlewares/auth.js');
const reservationRouter = express.Router();

reservationRouter.post('/createReservation', userAuth, createReservation);
reservationRouter.get('/getAllReservations', userAuth, getAllReservations);
reservationRouter.get('/getReservationById/:id', getReservationById);
reservationRouter.get('/getReservationCheckinById/:id',getReservationCheckinById);
reservationRouter.put('/updateReservationById/:id', userAuth,  updateReservationById);
reservationRouter.delete('/deleteReservationById/:id', userAuth, createReservation);

module.exports = { reservationRouter };
