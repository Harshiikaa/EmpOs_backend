const Department = require("../models/department");
const Employee = require("../models/employee");
const { sendSuccess } = require("../utils/response");

// create employee only by the admin
const createEmployee = async (req, res) => {
  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   department,
  //   position,
  //   managerId,
  //   role,
  //   previlege,
  //   joinDate,
  //   status,
  //   employeeImage,
  // } = req.body;
  // since we only had dep id so extracted departmentName here
  // const dept = await Department.findById(department);
  // console.log("Department name from id", dept.departmentName);

  const employee = await Employee.create(
    req.user._id,
    req.body
    // firstName,
    // lastName,
    // email,
    // department: dept._id,
    // position,
    // managerId,
    // role,
    // previlege,
    // joinDate,
    // status,
    // employeeImage,
  );
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
