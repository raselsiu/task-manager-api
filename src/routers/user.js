const express = require("express");
const User = require("../models/user");
const sharp = require("sharp");
const router = express.Router();
const multer = require("multer");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");
const auth = require("../middleware/auth");

//Creating Users or Sign up
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail("TMA", user.email);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login user

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// Logout user

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// Logout for All User

router.post("/logout/all/users", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Reading logged users

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Updating user

router.patch("/update/user/me", auth, async (req, res) => {
  // validation for unknown incoming user field first
  const requestVlaues = Object.keys(req.body);
  const allowedUpdateField = ["name", "email", "password", "age"];
  const isValidOperation = requestVlaues.every((reqValue) => {
    return allowedUpdateField.includes(reqValue);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update requests!" });
  }
  //   End incoming field validation

  try {
    requestVlaues.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deleting User

router.delete("/delete/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.name, req.user.email);
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// File Uploads

const uploads = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Unknown file type!"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  uploads.single("avatar"),
  async (req, res) => {
    //resizing Image
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 240, height: 240 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// delete avatar

router.delete("/delete/user/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// Fetching user avatar

router.get("/get/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
