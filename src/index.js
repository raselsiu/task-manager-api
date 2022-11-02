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
