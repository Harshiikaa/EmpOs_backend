const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");
const { sendError, sendSuccess } = require("../utils/response");
const { generateToken } = require("../utils/token");
const { formatOrgResponse } = require("../utils/formatters");

const createOrganization = async (
  organizationName,
  organizationEmail,
  adminFirstName,
  adminLastName,
  adminEmail,
  password
) => {
  const existingOrganization = await Organization.findOne({
    // organizationEmail,
    $or: [{ organizationEmail }, { adminEmail }],
  });
  if (existingOrganization) {
    return sendError(res, 400, "Organization or admin email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create organization
  const organization = await Organization.create({
    organizationName,
    organizationEmail,
    adminFirstName,
    adminLastName,
    adminEmail,
    password: hashedPassword,
  });
  return organization;
};

const login = async (adminEmail, password) => {
  const organization = await Organization.findOne({ adminEmail });
  if (!organization) {
    return sendError(res, 401, "Invalid Email");
  }
  const isPasswordValid = await organization.comparePassword(password);
  if (!isPasswordValid) {
    return sendError(res, 401, "Invalid email or password");
  }

  const token = generateToken(organization._id, organization.role);
  return {
    token,
    organization: formatOrgResponse(organization),
  };
};

module.exports = { createOrganization, login };
