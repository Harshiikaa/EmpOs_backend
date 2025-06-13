const Department = require("../models/department");
const { sendSuccess, sendError } = require("../utils/response");

const createDepartment = async (req, res) => {
  const { departmentName } = req.body;

  const department = await Department.create({
    departmentName,
    organization: req.user._id,
  });

  return sendSuccess(res, department, "Successfully Department Created", 201);
};

const getDepartments = async (req, res) => {
  const orgId = req.user._id;
  const departments = await Department.find({ organization: orgId });
  if (!departments || departments.length === 0) {
    return sendError(res, new Error("No departments found"), 404);
  }
  sendSuccess(res, departments, "Departments detail fetched successfully", 200);
};

const getDepartmentList = async (req, res) => {
  const orgId = req.user._id;
  const departmentList = await Department.find(
    { organization: orgId },
    "departmentName"
  );
  if (!departmentList || departmentList.length === 0) {
    return sendError(res, new Error("No departments found"), 404);
  }
  sendSuccess(res, departmentList, "Departments listed successfully", 200);
};


module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentList,
};
