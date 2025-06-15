const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");
const { sendError, sendSuccess } = require("../utils/response");
const { generateToken } = require("../utils/token");
const { formatOrgResponse } = require("../utils/formatters");

// Creates a new organization + admin registration

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

  // Hashing password using bcrypt
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

// logging into the system of the organization
const login = async (adminEmail, password) => {
  const organization = await Organization.findOne({ adminEmail });
  if (!organization) {
    return sendError(res, 401, "Invalid Email");
  }
  //use of the custome method made to compare password using bcrypt in the Organization model
  const isPasswordValid = await organization.comparePassword(password);
  if (!isPasswordValid) {
    return sendError(res, 401, "Invalid email or password");
  }

  // imprting genereateToken fucntion to generate the token
  const token = generateToken(organization._id, organization.role);
  return {
    token,
    // saved the response data in the formatOrgResponse
    organization: formatOrgResponse(organization),
  };
};

module.exports = { createOrganization, login };
