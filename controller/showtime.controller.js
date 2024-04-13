const { Showtime } = require("../model/showtime.js");

//Create a showtime --admin
const createShowtime = async (req, res) => {
  const showtime = new Showtime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get all showtime
const getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find({});
    res.status(200).send(showtimes);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get showtime by id
const getShowtimeById = async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findById(_id);
    if (!showtime) return res.status(404).send(`Not found showtime by ${_id}`);
    res.status(200).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Update showtime by id
const updateShowtimeById = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "startAt",
    "startDate",
    "endDate",
    "movieId",
    "cinemaId",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    res.status(400).send({ error: "Invalid updates!" });

  try {
    const showtime = await Showtime.findById(_id);
    updates.forEach((update) => (showtime[update] = req.body[update]));
    await showtime.save();
    if (!showtime) return res.status(404).send(`Not found showtime by ${_id}`);
    res.status(200).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Delete showtime by id
const deleteShowtimeById = async (req, res) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findByIdAndDelete(_id);
    if (!showtime) return res.status(404).send(`Not found showtime by ${_id}`);
    res.status(200).send(showtime);
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
    createShowtime,
    getAllShowtimes,
    getShowtimeById,
    updateShowtimeById,
    deleteShowtimeById
}