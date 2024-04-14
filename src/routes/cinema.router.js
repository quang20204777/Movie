const express = require('express');
const upload = require('../utils/multer');
const { adminAuth } = require('../middlewares/auth');
const {createCinema,
    uploadCinemaPhoto,
    getAllCinemas,
    getCinemaById,
    updateCinemaById,
    deleteCinemaById,
    getUserModeledCinemas,} = require('../controllers/cinema.controller');

const cinemaRouter = new express.Router();

cinemaRouter.post('/cinemas', adminAuth, createCinema);

cinemaRouter.post('/cinemas/photo/:id',  upload('cinemas').single('file'), uploadCinemaPhoto);

cinemaRouter.get('/cinemas', getAllCinemas);

cinemaRouter.get('/cinemas/:id', getCinemaById);

cinemaRouter.put('/cinemas/:id', adminAuth, updateCinemaById);

cinemaRouter.delete('/cinemas/:id', adminAuth, deleteCinemaById);

cinemaRouter.get('/cinemas/usermodeling/:username', getUserModeledCinemas);

module.exports = {cinemaRouter};
