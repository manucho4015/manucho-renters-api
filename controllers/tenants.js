const { StatusCodes } = require("http-status-codes");

const Tenant = require("../models/Tenant");

const getAllTenants = async (req, res) => {
  const tenants = await Tenant.find();

  res.status(StatusCodes.OK).json({ count: tenants.length, tenants });
};

const getTenant = async (req, res) => {
  const { id } = req.params;
  const tenant = await Tenant.findById(id);

  res.status(StatusCodes.OK).json({ tenant });
};

const createTenant = async (req, res) => {
  const tenant = await Tenant.create(req.body);

  res.status(StatusCodes.OK).json({ tenant });
};

const updateTenant = async (req, res) => {
  const { id } = req.params;
  const tenant = await Tenant.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ tenant });
};

const deleteTenant = async (req, res) => {
  const { id } = req.params;
  const tenant = await Tenant.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ deleted: true, tenant });
};

module.exports = {
  getAllTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
