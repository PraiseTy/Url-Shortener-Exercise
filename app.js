require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const userRouter = require("./routes/users");
const urlRouter = require("./routes/urls");
const {
  validateFields,
  validateFieldsMiddleware,
} = require("./middleware/validation");

const app = express();

app.use(express.json());

app.use("/api/v1", urlRouter);
app.use("/api/v1", validateFields, validateFieldsMiddleware, userRouter);

port = process.env.port || 3000;

app.get("/", (req, res) => {
  res.json({ msg: "Initial commit" });
});

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log("Error: ", error);
  }
};

start();
