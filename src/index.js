const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// Express
const app = express();
const port = process.env.PORT || 3000;
// End

// Registering on app
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
// End

// Starting Server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
// End

const becrypt = require("bcryptjs");

const passcheck = async () => {
  const password = "mypasscode";
  const hashedPass = await becrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPass);
  const isMatch = becrypt.compare("mypasscode", hashedPass).then((result) => {
    console.log(result);
  });
};

passcheck();
