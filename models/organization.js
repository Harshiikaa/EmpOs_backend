const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  ACCEPTANCE_STATUS,
  ORGANIZATION_STATUS,
  ORGANIZATION_SIZE,
  PLAN,
} = require("../constants/enums");

const organizationSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    organizationEmail: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    organizationAddress: {
      type: String,
      maxlength: 200,
    },
    organizationWebsite: {
      type: String,
      maxlength: 200,
    },
    industry: {
      type: String,
      maxlength: 100,
    },
    size: {
      type: String,
      enum: ORGANIZATION_SIZE,
    },
    plan: {
      type: String,
      enum: PLAN,
      default: "free",
    },
    adminFirstName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    adminLastName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    adminEmail: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    adminPhoneNumber: {
      type: String,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ORGANIZATION_STATUS,
      default: "active",
    },
    acceptanceStatus: {
      type: String,
      enum: ACCEPTANCE_STATUS,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

organizationSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
