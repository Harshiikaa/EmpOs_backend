const Department = require("../models/department");
const { sendSuccess } = require("../utils/response");

const createDepartment = async (req, res) => {
  const { departmentName, employees } = req.body;
  if (!departmentName) {
    return sendError(res, new Error("Department name is required"), 400);
  }
  const department = await Department.create({
    departmentName,
    organization: req.user._id,
    employees,
  });
  console.log("Creating dept for org ID:", req.user._id);

  return sendSuccess(res, department, "Successfully Department Created", 201);
};

module.exports = {
  createDepartment,
};
