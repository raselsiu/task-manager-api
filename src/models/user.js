const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 12,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password must not contain (password) text!");
      }
    },
  },
  age: {
    type: Number,
  },
});

module.exports = User;
