const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Invalid credentials" });
  }

  const token = authHeader.split(" ")[1];

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: payload.userId,
      name: payload.name,
      email: payload.email,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authentication" });
  }
};

module.exports = auth;
