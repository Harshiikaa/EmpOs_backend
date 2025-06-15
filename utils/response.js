// Sends a success response
exports.sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    sucess: true,
    message,
    data,
  });
};

// Sends an error response
exports.sendError = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({
    sucess: false,
    message: error.message || "Something went wrong",
    ...(error.details && { errors: error.details }),
  });
};
