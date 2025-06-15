const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");
const { sendError, sendSuccess } = require("../utils/response");
const { generateToken } = require("../utils/token");
const { formatOrgResponse } = require("../utils/formatters");
const organizationService = require("../services/organizationService");

// register organization + admin
const createOrganization = async (req, res) => {
  const {
    organizationName,
    organizationEmail,
    adminFirstName,
    adminLastName,
    adminEmail,
    password,
  } = req.body;

  const organization = await organizationService.createOrganization(req.body);
  // if (existingOrganization) {
  //   return sendError(res, 400, "Organization or admin email already exists");
  // }
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const organization = await Organization.create({
  //   organizationName,
  //   organizationEmail,
  //   adminFirstName,
  //   adminLastName,
  //   adminEmail,
  //   password: hashedPassword,
  // });
  return sendSuccess(
    res,
    organization,
    "Organization created successfully",
    201
  );
};

// login organization using admin details
const login = async (req, res) => {
  // const { adminEmail, password } = req.body;

  const organization = await organizationService.login(req.body);
  // if (!organization) {
  //   return sendError(res, 401, "Invalid Email");
  // }
  // const isPasswordValid = await organization.comparePassword(password);
  // if (!isPasswordValid) {
  //   return sendError(res, 401, "Invalid email or password");
  // }

  // const token = generateToken(organization._id, organization.role);
  return sendSuccess(
    res,
    {
      token,
      organization: formatOrgResponse(organization),
    },
    "Login successful",
    200
  );
};

module.exports = {
  createOrganization,
  login,
};
