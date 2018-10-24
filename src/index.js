"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const User = require("./models/User");

mongoose
  .connect(
    "mongodb://localhost/course-api",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch(() => {
    console.log("Error Connecting to Mongo");
  });

const user = new User({
  fullName: "Daniel Blah",
  emailAddress: "test@test.com",
  password: "password"
});

user.save();

// morgan gives us http request logging
app.use(morgan("dev"));

// TODO add additional routes here

// send a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Course Review API"
  });
});

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// set our port
app.set("port", process.env.PORT || 5000);
// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
