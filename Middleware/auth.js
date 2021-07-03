const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for the token
  if (!token)
    return res.status(401).send({ msg: "Authorization access denied" });

  //Allow the user
  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid!" });
  }
};

module.exports = auth;
