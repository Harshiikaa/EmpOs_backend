const { default: mongoose } = require("mongoose");

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
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    plan: {
      type: String,
      enum: ["free", "basic", "professional", "enterprise"],
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
      select: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    acceptanceStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
