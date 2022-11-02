require("../db/mongoose");
const User = require("../models/user");

// Updating User

const updateNameAndAge = async (id, name, age) => {
  const user = await User.findByIdAndUpdate(id, { name, age });
  const count = await User.countDocuments({ age });
  return count;
};

updateNameAndAge("635ec993bb119ad3587087eb", "Hello World", 12)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

// Deleting User

const deleteUser = async (id, age) => {
  const user = await User.findByIdAndDelete(id);
  const count = await User.countDocuments({ age });
  return count;
};

deleteUser("635ec993bb119ad3587087eb", 12)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
