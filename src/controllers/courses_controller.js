const Course = require("../models/Course");
const User = require("../models/User");
const Review = require("../models/Review");

module.exports = {
  getCourses(req, res, next) {
    Course.find({}).then(courses => {
      res.send(courses);
    });
  },

  //DO NOT UNDERSTAND THE POPULATE FOR THIS ROUTE
  getCourseById(req, res, next) {
    let id = req.params.courseId;
    Course.findOne({ _id: id })

      // .populate("user")
      // populate({ path: 'fans', select: 'name' }).
      .then(async course => {
        let user = await User.findById({ _id: course.user });

        if (!course) {
          let err = new Error("Course not found");
          return next(err);
        } else {
          return res.send({ course: course, user: user.fullName });
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

  //@TODO:
  postReview(req, res, next) {
    let courseToBeReviewed = req.params.courseId;
    console.log(courseToBeReviewed);
  }
};
