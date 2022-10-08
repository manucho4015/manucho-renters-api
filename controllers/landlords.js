const { StatusCodes } = require("http-status-codes");

const Landlord = require("../models/Landlord");

const getAllLandlords = async (req, res) => {
  const landlords = await Landlord.find();

  res.status(StatusCodes.OK).json({ count: landlords.length, landlords });
};

const getLandlord = async (req, res) => {
  const { id } = req.params;
  const landlord = await Landlord.findById(id);

  res.status(StatusCodes.OK).json({ landlord });
};

const createLandlord = async (req, res) => {
  const landlord = await Landlord.create(req.body);

  res.status(StatusCodes.OK).json({ landlord });
};

const updateLandlord = async (req, res) => {
  const { id } = req.params;
  const landlord = await Landlord.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ landlord });
};

const deleteLandlord = async (req, res) => {
  const { id } = req.params;
  const landlord = await Landlord.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ deleted: true, landlord });
};

module.exports = {
  getAllLandlords,
  getLandlord,
  createLandlord,
  updateLandlord,
  deleteLandlord,
};
