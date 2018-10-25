const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    // rating (Number, required, must fall between “1” and “5”)
  },
  review: {
    type: String
  }
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
