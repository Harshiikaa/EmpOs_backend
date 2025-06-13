const mongoose = require("mongoose");
const { EMPLOYEE_STATUSES, EMPLOYEE_ROLES } = require("../constants/enums");

const employeeSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    status: {
      type: String,
      enum: EMPLOYEE_STATUSES,
      default: "Active",
    },
    employeeImage: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: EMPLOYEE_ROLES,
      default: "Employee",
    },
    previlege: {
      type: Boolean,
      default: false,
    },
    joinDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
