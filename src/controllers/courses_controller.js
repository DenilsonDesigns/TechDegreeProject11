const Course = require("../models/Course");
const User = require("../models/User");
const Review = require("../models/Review");
const auth = require("basic-auth");

module.exports = {
  getCourses(req, res, next) {
    Course.find({}, "_id title").then(courses => {
      res.send(courses);
    });
  },

  getCourseById(req, res, next) {
    let id = req.params.courseId;
    Course.findOne({ _id: id })
      .populate("user")
      .populate("reviews")
      .then(async course => {
        if (!course) {
          let err = new Error("Course not found");
          return next(err);
        } else {
          return res.send({ course: course });
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
        err.message = "unable to create new course";
        return next(err);
      } else {
        return res.status(201).end();
      }
    });
  },

  updateCourse(req, res, next) {
    let courseId = req.params.courseId;
    let courseProps = req.body;

    Course.findByIdAndUpdate({ _id: courseId }, courseProps).then(() => {
      return res.status(204).end();
    });
  },

  //@TODO:
  async postReview(req, res, next) {
    let credentials = auth(req);
    let userId;
    //get userId
    await User.find({ emailAddress: credentials.name }).then(user => {
      userId = user[0]._id;
    });

    //create review in review schema
    const review = new Review({
      user: userId,
      rating: req.body.rating
    });
    //save review- is this step needed?
    await review.save();
    //find course from :courseId and push review
    await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $push: { reviews: review } }
    ).catch(err => {
      return next(err);
    });

    //send user back to course page with 201 status
    return res.status(201).redirect("/api/courses/" + req.params.courseId);
  }
};
