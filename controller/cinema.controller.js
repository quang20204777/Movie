const { Cinema } = require("../model/cinema.js");

//Create cinema
const createCinema = async (req, res) => {
  const cinema = new Cinema(req.body);
  try {
    await cinema.save();
    res.status(201).send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get all cinema
const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find({});
    res.status(200).send(cinemas);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Get cinema by id
const getCinemaById = async (req, res) => {
    const _id = req.params.id
    try{
        const cinema = await Cinema.findById(_id)
        if (!cinema) return res.status(404).send(`Not found cinema by ${id}`)
        res.status(200).send(cinema)
    }catch(e) {
        res.status(400).send(e)
    }
}

//Update cinema by id
const updateCinemaById = async (req, res) =>{
    const _id = req.params.id
    const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try{
    const cinema = await Cinema.findById(_id)
    updates.forEach((update) => (cinema[update] = req.body[update]));
    await cinema.save();
    if (!cinema) return res.sendStatus(404);
    res.status(200).send(cinema);
  }catch(e) {
    res.status(400).send(e)
  }
}

// Delete cinema by id
const deleteCinema = async (req, res) => {
    const _id = req.params.id;
    try {
      const cinema = await Cinema.findByIdAndDelete(_id);
      if (!cinema) return res.status(404).send(`Not found cinema`);
      res.send(cinema);
    } catch (e) {
      res.sendStatus(400);
    }
}

module.exports = {
  createCinema
}
