const Department = require("../models/department");
const { sendSuccess, sendError } = require("../utils/response");
const departmentService = require("../services/departmentService");

const createDepartment = async (organizationId, departmentName) => {
  return await Department.create({
    departmentName,
    organization: organizationId,
  });
};

const getDepartments = async (organizationId) => {
  const departments = await Department.find({ organization: organizationId });
  if (!departments || departments.length === 0) {
    return sendError(res, new Error("No departments found"), 404);
  }
  return departments;
};

const getDepartmentList = async (organizationId) => {
  const departmentList = await Department.find(
    { organization: organizationId },
    "departmentName"
  );
  if (!departmentList || departmentList.length === 0) {
    return sendError(res, new Error("No departments found"), 404);
  }
  return departmentList;
};

module.exports = { createDepartment, getDepartments, getDepartmentList };
