const Organization = require("../models/organization");
const bcrypt = require("bcrypt");
const { sendError, sendSuccess } = require("../utils/response");

// register organization with admin
const createOrganization = async(req, res) => {
  const {
    organizationName,
    organizationEmail,
    adminFirstName,
    adminLastName,
    adminEmail,
    password,
  } = req.body;

  const existingOrganization = await Organization.findOne({ organizationEmail });
  if (existingOrganization) {
    return sendError(res, 400, "Email already exists");
  }
  const salt =await bcrypt.genSalt(10);
  const hashedPassword =await bcrypt.hash(password, salt);
  const organization =await Organization.create({
    organizationName,
    organizationEmail,
    adminFirstName,
    adminLastName,
    adminEmail,
    password: hashedPassword,
  });
  return sendSuccess(
    res,
    organization,
    "Organization created successfully",
    201
  );
};

module.exports = {
  createOrganization,
};
