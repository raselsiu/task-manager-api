const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// Express
const app = express();
const port = process.env.PORT || 3000;
// End

// Registering on app

// Disabling All Get Route by Middleware
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET Requset is disable!");
//   } else {
//     next();
//   }
// });

// Site Maintanance Msg by Middleware

// app.use((req, res, next) => {
//   res.status(503).send("Service unavailable");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
// End

// Starting Server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
// End
