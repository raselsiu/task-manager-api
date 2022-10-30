// CRUD System
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect to database!");
    }

    const db = client.db(databaseName);

    // ########## Deleting Data with many (DeleteOne is same as DeleteMany)

    // db.collection("users")
    //   .deleteMany({
    //     age: 25,
    //   })
    //   .then((result) => {
    //     console.log(result.deletedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // ########### Updating Data with many
    // db.collection("users")
    //   .updateMany(
    //     {},
    //     {
    //       $set: {
    //         name: "Rasel D",
    //         age: 25,
    //       },
    //     }
    //   )
    //   .then((updatedResult) => {
    //     console.log(updatedResult);
    //   })
    //   .catch((error) => {
    //     console.log("something went wrong!" + error);
    //   });

    // ############ Updating Data with one

    // db.collection("users")
    //   .updateOne(
    //     {
    //       age: 255,
    //     },
    //     {
    //       $set: {
    //         name: "Rasel Updated",
    //         age: "hello world",
    //       },
    //     }
    //   )
    //   .then((updatedResult) => {
    //     console.log(updatedResult);
    //   })
    //   .catch((error) => {
    //     console.log("something went wrong!" + error);
    //   });

    // ########### Reading Data

    // db.collection("users").findOne(
    //   {
    //     _id: new ObjectId("635e5fc75fc801e2d0ff0b48"),
    //   },
    //   (error, result) => {
    //     if (error) {
    //       console.log("unable to fetch");
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection("users")
    //   .find({
    //     age: 45,
    //   })
    //   .toArray((error, result) => {
    //     if (error) {
    //       console.log("unable to fetch");
    //     }
    //     console.log(result);
    //   });

    // ############### Creating Data to Database

    // db.collection("users").insertOne(
    //   {
    //     name: "sdf ertrt",
    //     age: 343,
    //   },

    //   (error, result) => {
    //     if (error) {
    //       console.log("unable to insert user");
    //     }
    //     console.log(result);
    //   }
    // );

    // ############### Creating Data with insertMany
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Rasel Ahmed",
    //       age: 27,
    //     },
    //     {
    //       name: "Rasel ertrt",
    //       age: 45,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       console.log("unable to insert user");
    //     }
    //     console.log(result);
    //   }
    // );
  }
);
