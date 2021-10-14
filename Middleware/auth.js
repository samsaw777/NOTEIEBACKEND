const jwt = require("jsonwebtoken");
const User = require("../Model/users");
const db = require("../firebase");
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for the token
  if (!token)
    return res.status(401).send({ msg: "Authorization access denied" });

  //Allow the user
  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log(decode.id);
    db.collection("users")
      .doc(`${decode.id}`)
      .get()
      .then((user) => {
        // console.log(user.id);
        const User = user.data();
        User.id = user.id;

        // res.send(User);
        req.user = User;
        next();
      });
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid!" });
  }
};

module.exports = auth;
