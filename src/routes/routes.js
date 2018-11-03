const UsersController = require("../controllers/users_controller");
const CoursesController = require("../controllers/courses_controller");

module.exports = app => {
  //TEST - Working
  app.get("/api", UsersController.greeting);

  //   GET /api/users 200 - Returns the currently authenticated user
  app.get("/api/users", UsersController.authenticateUser);

  //   POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
  app.post("/api/users", UsersController.postNewUser);

  // GET /api/courses 200 - Returns the Course "_id" and "title" properties
  app.get("/api/courses", CoursesController.getCourses);

  // GET /api/course/:courseId 200 - Returns all Course properties and related documents for the provided course ID
  app.get("/api/courses/:courseId", CoursesController.getCourseById);

  // POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
  app.post(
    "/api/courses",
    UsersController.checkIfUser,
    CoursesController.createCourse
  );

  // PUT /api/courses/:courseId 204 - Updates a course and returns no content
  app.put(
    "/api/courses/:courseId",
    UsersController.checkIfUser,
    CoursesController.updateCourse
  );
  //@TODO- needs error handling?

  // POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content- NOT ATTEMPTED YET
  app.post(
    "/api/courses/:courseId/reviews",
    UsersController.checkIfUser,
    CoursesController.postReview
  );
};
