import mongoose from "mongoose";
import validator from "validator";

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

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

const createUser = new User({
  name: "Rasel new",
  email: "raselqax@gmail.com",
  age: 32,
  password: " Password34",
});

createUser
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("error", error);
  });
