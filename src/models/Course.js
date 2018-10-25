const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded: {
    type: String
  }

  // steps (Array of objects that include stepNumber (Number), title (String, required) and description (String, required) properties)
  // reviews (Array of ObjectId values, _id values from the reviews collection)
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;
