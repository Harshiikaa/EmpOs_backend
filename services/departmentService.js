const Department = require("../models/department");
const { sendSuccess, sendError } = require("../utils/response");
const departmentService = require("../services/departmentService");

// Creates a new department under the given organization.
const createDepartment = async (organizationId, departmentName) => {
  return await Department.create({
    departmentName,
    organization: organizationId,
  });
};

// fetches departments with its detail from the associated Organization
const getDepartments = async (organizationId) => {
  const departments = await Department.find({ organization: organizationId });
  if (!departments || departments.length === 0) {
    return sendError(res, new Error("No departments found"), 404);
  }
  return departments;
};

// fetches only department and lists it
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
