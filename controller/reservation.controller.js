const { Reservation } = require("../model/reservation.js");

// Create reservation --all user
const createReservation = async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    await reservation.save();
    res.status(201).send({ reservation});
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

// Get all reservations --all user
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).send(reservations);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Get reservation by id
const getReservationById = async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    return !reservation
      ? res.status(404).send(`Not found reservation by ${_id}`)
      : res.status(200).send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Get reservation checkin by id --vé đã được sử dụng
const getReservationCheckinById = async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findById(_id);
    reservation.checkin = true;
    await reservation.save();
    return !reservation
      ? res.status(404).send(`Not found reservation by ${_id}`)
      : res.status(200).send(reservation);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Update reservation by id
const updateReservationById = async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "date",
    "startAt",
    "seats",
    "ticketPrice",
    "total",
    "username",
    "phone",
    "checkin",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const reservation = await Reservation.findById(_id);
    updates.forEach((update) => (reservation[update] = req.body[update]));
    await reservation.save();
    return !reservation
      ? res.status(404).send(`Not found reservation by ${_id}`)
      : res.status(200).send(reservation);
  } catch (e) {
    return res.status(400).send(e);
  }
};

// Delete reservation by id
const deleteReservationById = async (req, res) => {
  const _id = req.params.id;
  try {
    const reservation = await Reservation.findByIdAndDelete(_id);
    return !reservation
      ? res.status(404).send(`Not found reservation by ${_id}`)
      : res.status(200).send(reservation);
  } catch (e) {
    return res.sendStatus(400);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationCheckinById,
  updateReservationById,
  deleteReservationById,
};
