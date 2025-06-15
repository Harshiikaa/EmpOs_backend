// generates jwt token
exports.generateToken = (id, role = "admin") => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
