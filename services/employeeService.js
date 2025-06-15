const Department = require("../models/department");
const Employee = require("../models/employee");
const { sendError } = require("../utils/response");
const default_employee_avatar = "/assets/images/default-employee-avatar.jpg";

// Creates a new employee under the given organization by the admin only.
const createEmployee = async (organizationId, employeeData) => {
  const {
    firstName,
    lastName,
    email,
    department,
    position,
    managerId,
    role,
    previlege,
    joinDate,
    status,
    employeeImage,
  } = employeeData;
  const dept = await Department.findById(department);
  // console.log("Department name from id", dept.departmentName);
  if (!dept) {
    sendError(res, 401, "Depratment does not exist");
  }
  const image = employeeImage?.trim() || default_employee_avatar;
  const employee = await Employee.create({
    organization: organizationId,
    firstName,
    lastName,
    email,
    department: dept._id,
    position,
    managerId,
    role,
    previlege,
    joinDate,
    status,
    employeeImage: image,
  });

  return {
    ...employee.toObject(),
    department: {
      _id: dept._id,
      name: dept.departmentName,
    },
  };
};

module.exports = { createEmployee };
