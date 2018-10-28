const UsersController = require("../controllers/users_controller");

module.exports = app => {
  //TEST - Working
  app.get("/api", UsersController.greeting);

  //   GET /api/users 200 - Returns the currently authenticated user
  // (//GET /profile)

  //   POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
  app.post("/api/users", UsersController.postNewUser);

  // GET /api/courses 200 - Returns the Course "_id" and "title" properties

  // GET /api/course/:courseId 200 - Returns all Course properties and related documents for the provided course ID

  // When returning a single course for the GET /api/courses/:courseId route, use Mongoose population to load the related user and reviews documents.

  // POST /api/courses 201 - Creates a course, sets the Location header, and returns no content

  // PUT /api/courses/:courseId 204 - Updates a course and returns no content

  // POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
};
