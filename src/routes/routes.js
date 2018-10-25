const UsersController = require("../controllers/users_controller");

module.exports = app => {
   //TEST - Working
  app.get("/api", UsersController.greeting);

//   GET /api/users 200 - Returns the currently authenticated user

//   POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content


};

