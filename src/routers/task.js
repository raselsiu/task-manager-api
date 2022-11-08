const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = express.Router();

// Task

router.post("/task", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Fetching all task

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const loggedUser = await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(loggedUser.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Fetching task by ID

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Updating Task

router.patch("/update/task/:id", auth, async (req, res) => {
  // validation for unknown incoming task field first
  const requestUpdateVlaue = Object.keys(req.body);
  const allowedUpdateField = ["description", "completed"];
  const isValidOperation = requestUpdateVlaue.every((reqUpdateFields) => {
    return allowedUpdateField.includes(reqUpdateFields);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update requests!" });
  }
  //   End incoming field validation

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    requestUpdateVlaue.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deleting Task

router.delete("/delete/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
