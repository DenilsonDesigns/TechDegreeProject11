const Course = require("../models/Course");

module.exports = {
  getCourses(req, res, next) {
    Course.find({}).then(courses => {
      res.send(courses);
    });
  },

  getCourseById(req, res, next) {
    let id = req.params.courseId;
    Course.findById({ _id: id }).then(course => {
      res.send(course);
    });
  },

  createCourse(req, res, next) {
    console.log("Course Create Route");
  },

  updateCourse(req, res, next) {
    let courseToBeUpdated = req.params.courseId;
    console.log(courseToBeUpdated);
  },

  postReview(req, res, next) {
    let courseToBeReviewed = req.params.courseId;
    console.log(courseToBeReviewed);
  }
};
