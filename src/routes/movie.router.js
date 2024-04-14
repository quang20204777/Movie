const express = require('express');
const { adminAuth } = require('../middlewares/auth');
const upload = require('../utils/multer');
const movieController = require('../controllers/movie.controller');

const movieRouter = new express.Router();

movieRouter.post('/movies', adminAuth, movieController.createMovie);

movieRouter.get(
  '/movies/photo/:id',
  adminAuth,
  upload('movies').single('file'),
  movieController.uploadMoviePhoto
);

movieRouter.get('/movies', movieController.getAllMovies);

movieRouter.get('/movies/:id', movieController.getMovieById);

movieRouter.put('/movies/:id', adminAuth, movieController.updateMovieById);

movieRouter.delete('/movies/:id', adminAuth, movieController.deleteMovieById);

movieRouter.get('/movies/usermodeling/:username', movieController.getUserModeledMovies);

module.exports = {movieRouter};
