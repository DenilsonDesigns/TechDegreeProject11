const User = require("../models/User");
const auth = require("basic-auth");

module.exports = {
  //test
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  //post and create new user instance
  postNewUser(req, res, next) {
    //check if email, fullaname, and password supplied
    if (req.body.emailAddress && req.body.fullName && req.body.password) {
      //create user object
      let user = {
        emailAddress: req.body.emailAddress,
        fullName: req.body.fullName,
        password: req.body.password
      };
      //create user in db
      User.create(user, (err, user) => {
        if (err) {
          return next(err);
        } else {
          return res.status(201).redirect("/");
        }
      });
    }
  },

  authenticateUser(req, res, next) {
    let credentials = auth(req);

    if (!credentials) {
      err.statusCode = 401;
      return next(err);
    } else {
      User.authenticate(credentials.name, credentials.pass, (err, user) => {
        if (err) {
          return next(err);
        } else {
          res.send(user);
          return next();
        }
      });
    }
  }
}; ////////////END EXPORTS
