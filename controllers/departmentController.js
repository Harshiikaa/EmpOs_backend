const Department = require("../models/department");

const createDepartment = async (req, res) => {
  const { departmentName, organization, employees } = req.body;
  const department = await Department.create({
    departmentName,
    organization,
    employees,
  });
  return sendSuccess(res, department, "Successfully Department Created", 201);
};

module.exports = {
  createDepartment,
};
