const express = require("express");
const User = require("../models/user");
const router = express.Router();

//Creating Users
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Reaing users

router.get("/users/", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(404).send({ message: "Not found Data" });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Updating user

router.patch("/update/user/:id", async (req, res) => {
  // validation for unknown incoming user field first
  const requestUpdateVlaue = Object.keys(req.body);
  const allowedUpdateField = ["name", "email", "password", "age"];
  const isValidOperation = requestUpdateVlaue.every((reqUpdateFields) => {
    return allowedUpdateField.includes(reqUpdateFields);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates requests!" });
  }
  //   End incoming field validation

  try {
    const user = await User.findById(req.params.id);

    requestUpdateVlaue.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deleting User

router.delete("/delete/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
