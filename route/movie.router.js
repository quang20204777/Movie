const express = require('express');
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} = require('../controller/movie.controller.js');
const { adminAuth } = require('../middlewares/auth.js');
const movieRouter = express.Router();

movieRouter.post('/createMovie', adminAuth, createMovie);
movieRouter.get('/getAllMovies', getAllMovies);
movieRouter.get('/getMovieById/:id', getMovieById);
movieRouter.put('/updateMovieById/:id', adminAuth, updateMovieById);
movieRouter.delete('/deleteMovieById/:id', adminAuth, deleteMovieById);

module.exports = { movieRouter };
