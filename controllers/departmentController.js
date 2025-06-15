const Department = require("../models/department");
const { sendSuccess, sendError } = require("../utils/response");
const departmentService = require("../services/departmentService");

// Creates department but only by the admin of the associated organization
const createDepartment = async (req, res) => {
  const { departmentName } = req.body;
  const department = await departmentService.createDepartment(
    req.user._id,
    departmentName
  );
  return sendSuccess(res, department, "Successfully Department Created", 201);
};

// get Departments details
const getDepartments = async (req, res) => {
  const orgId = req.user._id;
  const departments = await departmentService.getDepartments(orgId);
  // if (!departments || departments.length === 0) {
  //   return sendError(res, new Error("No departments found"), 404);
  // }
  sendSuccess(res, departments, "Departments detail fetched successfully", 200);
};

// get department list only 
const getDepartmentList = async (req, res) => {
  const orgId = req.user._id;
  const departmentList = await departmentService.getDepartmentList(orgId);
  // if (!departmentList || departmentList.length === 0) {
  //   return sendError(res, new Error("No departments found"), 404);
  // }
  sendSuccess(res, departmentList, "Departments listed successfully", 200);
};

module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentList,
};
