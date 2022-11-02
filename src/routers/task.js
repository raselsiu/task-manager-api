const express = require("express");
const Task = require("../models/task");
const router = express.Router();

// Task

router.post("/task", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Fetching all task

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Fetching task by ID

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById({ _id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Updating Task

router.patch("/update/task/:id", async (req, res) => {
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
    const task = await Task.findById(req.params.id);

    requestUpdateVlaue.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deleting Task

router.delete("/delete/task/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
