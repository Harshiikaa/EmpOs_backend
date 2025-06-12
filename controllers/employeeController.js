const Department = require("../models/department");
const Employee = require("../models/employee");
const { sendSuccess } = require("../utils/response");

const createEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    department,
    position,
    managerId,
    joinDate,
    status,
    employeeImage,
  } = req.body;
  // since we only had dep id so extracted departmentName here
  const dept = await Department.findById(department);
  console.log("Department name from id", dept.departmentName);

  const employee = await Employee.create({
    organization: req.user._id,
    firstName,
    lastName,
    email,
    department: dept._id,
    position,
    managerId,
    joinDate,
    status,
    employeeImage,
  });
  // console.log("Creating employees for org ID:", req.user._id);
  // console.log("Logged-in user:", req.user);
  //   return sendSuccess(res, employee, "Employee created successfully");
  // manually extracted departmentName by changing the employee to object
  return sendSuccess(
    res,
    {
      ...employee.toObject(),
      department: {
        _id: dept._id,
        name: dept.departmentName,
      },
    },
    "Employee created successfully"
  );
};

module.exports = { createEmployee };
