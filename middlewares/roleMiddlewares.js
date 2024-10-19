const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = function (roleParams) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "user is not registered" });
      }

      const { role } = jwt.verify(token, secret);

      if (role !== roleParams) {
        return res
          .status(403)
          .json({ message: "user does not have such rights" });
      }
      next();

      //   if (!roleJwt === "admin") {
      //     return res
      //       .status(403)
      //       .json({ message: "user does not have such rights" });
      //   }
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "user is not registered" });
    }
  };
};
