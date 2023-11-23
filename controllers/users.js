const User = require("../models/User");

const createNewUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return res.status(201).json({
      message: "User created successfully",
      data: { id: user.id, name },
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong.Try again" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }); //Used email instead of the normally used id because it's unique

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    const token = user.createJWT();

    return res
      .status(200)
      .json({
        message: "Login successful",
        data: { name, token, id: user.id },
      });
  } catch (error) {}
};

module.exports = { createNewUsers, loginUser };
