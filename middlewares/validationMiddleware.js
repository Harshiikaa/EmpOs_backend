const { validationResult } = require("express-validator");
const { sendError } = require("../utils/response");

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.details = errors.array().map((e) => ({
      field: e.param,
      message: e.msg,
    }));
    return sendError(res, error, 400);
    // error.details = errors.array().map((e) => e.msg);
    // return sendError(res, error, 400);
    // return res.status(400).json({
    //   success: false,
    //   errors: errors.array().map((e) => e.msg),
    // });
  }
  next();
};
