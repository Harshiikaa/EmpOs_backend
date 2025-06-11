const Organization = require("../models/organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendError, sendSuccess } = require("../utils/response");

// register organization with admin
const createOrganization = async (req, res) => {
  const {
    organizationName,
    organizationEmail,
    adminFirstName,
    adminLastName,
    adminEmail,
    password,
  } = req.body;

  const existingOrganization = await Organization.findOne({
    organizationEmail,
  });
  if (existingOrganization) {
    return sendError(res, 400, "Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const organization = await Organization.create({
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

// login organization

const login = async (req, res) => {
  const { adminEmail, password } = req.body;

  const organization = await Organization.findOne({ adminEmail });
  const isPasswordValid =
    organization && (await organization.comparePassword(password));
  if (!isPasswordValid) {
    return sendError(res, 401, "Invalid email or password");
  }
  const token = jwt.sign(
    {
      id: organization._id,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return sendSuccess(
    res,
    {
      token,
      organization: {
        _id: organization._id,
        organizationName: organization.organizationName,
        adminFirstName: organization.adminFirstName,
        adminLastName: organization.adminLastName,
        adminEmail: organization.adminEmail,
        plan: organization.plan,
        status: organization.status,
      },
    },
    "Login successful",
    200
  );
};

module.exports = {
  createOrganization,
  login,
};
