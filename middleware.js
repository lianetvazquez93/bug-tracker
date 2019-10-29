const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const user = jwt.verify(token, process.env.SECRET);
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(401).send("Token did not work");
  }
};

module.exports = {
  isAuthenticated,
};
