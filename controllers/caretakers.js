const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-error");

const Caretaker = require("../models/Caretaker");

const getAllCaretakers = async (req, res) => {
  const caretakers = await Caretaker.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ count: caretakers.length, caretakers });
};

const getCaretaker = async (req, res) => {
  const {
    user: { userId },
    params: { id: caretakerId },
  } = req;
  const caretaker = await Caretaker.findOne({
    _id: caretakerId,
    createdBy: userId,
  });

  if (!caretaker) {
    throw new CustomAPIError(StatusCodes.NOT_FOUND, "Caretaker not found!");
  }

  res.status(StatusCodes.OK).json({ caretaker });
};

const createCaretaker = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const caretaker = await Caretaker.create(req.body);

  res.status(StatusCodes.OK).json({ caretaker });
};
const updateCaretaker = async (req, res) => {
  const {
    user: { userId },
    params: { id: caretakerId },
  } = req;

  if (req.body.password) {
    throw new CustomAPIError(
      StatusCodes.UNAUTHORIZED,
      "You are not authorized to change caretaker's password."
    );
  }

  const caretaker = await Caretaker.findByIdAndUpdate(
    { _id: caretakerId, landlord: userId },
    req.body,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ caretaker });
};
const deleteCaretaker = async (req, res) => {
  const {
    user: { userId },
    params: { id: caretakerId },
  } = req;

  const caretaker = await Caretaker.findByIdAndRemove({
    _id: caretakerId,
    landlord: userId,
  });

  res.status(StatusCodes.OK).json({ success: true, caretaker });
};

module.exports = {
  getAllCaretakers,
  getCaretaker,
  createCaretaker,
  updateCaretaker,
  deleteCaretaker,
};
