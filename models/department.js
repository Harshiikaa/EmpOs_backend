const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      maxlength: 100,
    },

    // comes from Organization Table
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// In every organization, the department name will not be repeated
departmentSchema.index(
  { organization: 1, departmentName: 1 },
  { unique: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
