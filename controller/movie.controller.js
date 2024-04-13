const { Movie } = require("../model/movie.js");

//Create a movie --admin
const createMovie = async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get all movies --all users
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get movie by id -- all users
const getMovieById = async (req, res) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findById(_id);
    if (!movie) return res.status(404).send("Not found movie");
    res.status(200).send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Update movie by id --admin
const updateMovieById = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "image",
    "language",
    "genre",
    "director",
    "cast",
    "description",
    "duration",
    "releaseDate",
    "endDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const movie = await Movie.findById(_id);
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    if (!movie) return res.status(404).send("Not found movie");
    res.status(200).send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
};

//Delete movie by id --admin
const deleteMovieById = async (req, res) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findByIdAndDelete(_id);
    if (!movie) return res.status(404).send("Not found movie");
    res.status(200).send(`Delete movie by ${_id}`);
  } catch (e) {
    return res.sendStatus(400);
  }
};
module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById
};
