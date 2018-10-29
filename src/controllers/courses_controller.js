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
      if (err) {
        return next(err);
      } else {
        return res.send(course);
      }
    });
  },

  createCourse(req, res, next) {
    let course = {
      title: req.body.title,
      description: req.body.description
    };

    Course.create(course, (err, newCourse) => {
      if (err) {
        return next(err);
      } else {
        return res.status(201).redirect("/");
      }
    });
  },

  updateCourse(req, res, next) {
    let courseId = req.params.courseId;
    let courseProps = req.body;

    Course.findByIdAndUpdate({ _id: courseId }, courseProps).then(() => {
      return res.status(204).redirect("/");
    });
  },

  postReview(req, res, next) {
    let courseToBeReviewed = req.params.courseId;
    console.log(courseToBeReviewed);
  }
};
