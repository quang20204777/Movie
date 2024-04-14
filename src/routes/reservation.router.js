const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/auth');
const   {createReservation,
getAllReservations,
getReservationById,
checkinReservationById,
updateReservationById,
deleteReservationById,
getUserModeledReservationSeats,} = require('../controllers/reservation.controller');

const reservationRouter = new express.Router();

reservationRouter.post('/reservations', userAuth, createReservation);

reservationRouter.get('/reservations', userAuth, getAllReservations);

reservationRouter.get('/reservations/:id', getReservationById);

reservationRouter.get('/reservations/checkin/:id', checkinReservationById);

reservationRouter.patch('/reservations/:id', adminAuth, updateReservationById);

reservationRouter.delete('/reservations/:id', adminAuth, deleteReservationById);

reservationRouter.get('/reservations/usermodeling/:username', getUserModeledReservationSeats);

module.exports = {reservationRouter};
