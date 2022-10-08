const { StatusCodes } = require("http-status-codes");

const Caretaker = require("../models/Caretaker");

const getAllCaretakers = async (req, res) => {
  const caretakers = await Caretaker.find();

  res.status(StatusCodes.OK).json({ count: caretakers.length, caretakers });
};

const getCaretaker = async (req, res) => {
  const { id } = req.params;
  const caretaker = await Caretaker.findById(id);

  res.status(StatusCodes.OK).json({ caretaker });
};

const createCaretaker = async (req, res) => {
  const caretaker = await Caretaker.create(req.body);

  res.status(StatusCodes.OK).json({ caretaker });
};
const updateCaretaker = async (req, res) => {
  const { id } = req.params;
  const caretaker = await Caretaker.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ caretaker });
};
const deleteCaretaker = async (req, res) => {
  const { id } = req.params;
  const caretaker = await Caretaker.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ caretaker });
};

module.exports = {
  getAllCaretakers,
  getCaretaker,
  createCaretaker,
  updateCaretaker,
  deleteCaretaker,
};
