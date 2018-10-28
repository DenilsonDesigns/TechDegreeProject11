const User = require("../models/User");

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
  }
}; ////////////END EXPORTS

// const Driver = require("../models/driver");

// module.exports = {
//   greeting(req, res) {
//     res.send({ hi: "there" });
//   },

//   index(req, res, next) {
//     const { lng, lat } = req.query;
//     const point = {
//       type: "Point",
//       coordinates: [parseFloat(lng), parseFloat(lat)]
//     };
//     Driver.aggregate([
//       {
//         $geoNear: {
//           near: point,
//           spherical: true,
//           maxDistance: 200000,
//           distanceField: "dist.calculated"
//         }
//       }
//     ])
//       .then(drivers => res.send(drivers))

//       .catch(next);
//   },

//   create(req, res, next) {
//     const driverProps = req.body;

//     Driver.create(driverProps)
//       .then(driver => res.send(driver))
//       .catch(next);
//   },

//   edit(req, res, next) {
//     const driverId = req.params.id;
//     const driverProps = req.body;

//     Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
//       .then(() => Driver.findById({ _id: driverId }))
//       .then(driver => res.send(driver))
//       .catch(next);
//   },

//   delete(req, res, next) {
//     const driverId = req.params.id;

//     Driver.findByIdAndRemove({ _id: driverId })
//       .then(driver => res.status(204).send(driver))
//       .catch(next);
//   }
// };
